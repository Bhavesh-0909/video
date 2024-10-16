"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { generateToken04 } from "@/config/token";

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// get token

function Page() {
  const { data } = useSession();
  const roomID = useSearchParams().get("roomId");
  const userID = randomID(5);

  let myMeeting = async (element: HTMLDivElement) => {
    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID as string);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET as string;
    const experationTime = 3600;
    // generate token
    const token = generateToken04(appID, userID, serverSecret, experationTime);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      appID,
      token,
      roomID as string,
      userID,
      data?.user?.name as string
    );
    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy link',
          url:
            window.location.origin +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return(
    <div className="w-screen min-h-screen -ml-14" ref={myMeeting}>
    </div>
  );
}

export default Page;
