"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { randomUUID } from "crypto";

function Page() {
  const { data } = useSession();
  const searchParam = useSearchParams();
  const roomId = searchParam.get("meetcode");

  const myMeeting = (element: any) => {
    if (!element) return;
    const appID = process.env.NEXT_PUBLIC_ZEGO_APP_ID;
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      console.error("App ID or Server Secret is not set!");
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      parseInt(appID),
      serverSecret,
      roomId as string,             
      randomUUID(),       
      data?.user?.name as string 
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (!zp) {
      console.error("Failed to create Zego UIKit instance");
      return;
    }

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy link',
          url: `${window.location.origin}/loby/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, 
      },
      onUserAvatarSetter: (userList) => {
        userList.forEach((user) => {
          user.avatar = data?.user?.image as string;
        });
      },
      branding: {
        logoURL: `${window.location.origin}/logo.png`,
      },
      preJoinViewConfig: {
        title: 'Video'
      },
      showRemoveUserButton: true,
      showInviteToCohostButton: true,
      showRemoveCohostButton: true,
      showRequestToCohostButton: true,
      liveNotStartedTextForAudience: 'Waiting for host to start the live',
    });
  };

  return (
    <div className="w-full h-full min-h-screen" ref={(element)=> myMeeting(element)}>
    </div>
  );
}

export default Page;