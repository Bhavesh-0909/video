"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { generateToken04 } from "@/config/token";
import { useEffect, useState } from "react";

function randomID(len) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function Page() {
  const { data } = useSession();
  const roomID = useSearchParams()?.get("roomId"); // Ensure roomID is accessed correctly
  const userID = randomID(5);
  const [isClient, setIsClient] = useState(false); // Track if we're on the client

  useEffect(() => {
    // Only set the flag to true after the component has mounted on the client
    setIsClient(true);
  }, []);

  const myMeeting = async (element) => {
    if (!element || !isClient) return; // Ensure code only runs on the client

    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    const experationTime = 3600;

    try {
      const token = await generateToken04(appID, userID, serverSecret, experationTime);

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        appID,
        token,
        roomID,
        userID,
        data?.user?.name
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url: `${window.location.origin}${window.location.pathname}?roomId=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // Adjust as needed
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Render nothing on the server
  if (!isClient) {
    return null;
  }

  return (
    <div
      className="-ml-14"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}

export default Page;
