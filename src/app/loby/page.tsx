"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect } from "react";

function Page() {
  const { data } = useSession();
  const roomId = useSearchParams().get("roomId");

  useEffect(() => {
    // Check if the required data is available before proceeding
    if (!data || !data.user || !data.user.name || !roomId) {
      return; // Exit early if any required data is not available
    }

    const appID = process.env.NEXT_PUBLIC_ZEGO_APP_ID;
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      console.error("App ID or Server Secret is not set!");
      return;
    }

    const uuid = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      parseInt(appID as string),
      serverSecret as string,
      roomId as string,
      uuid.toString(),
      data.user.name as string,
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (!zp) {
      console.error("Failed to create Zego UIKit instance");
      return;
    }

    const element = document.getElementById("meeting-container");
    if (element) {
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy link",
            url: `${window.location.origin}/loby/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
          config: {
            role: ZegoUIKitPrebuilt.Host,
          },
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
          title: "Video",
        },
        showRemoveUserButton: true,
        showInviteToCohostButton: true,
        showRemoveCohostButton: true,
        showRequestToCohostButton: true,
        liveNotStartedTextForAudience: "Waiting for host to start the live",
      });
    }
  }, [data, roomId]);

  return <div className="w-full h-full mt-10" id="meeting-container"></div>;
}

export default Page;
