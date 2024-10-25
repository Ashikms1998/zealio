'use client'
import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from 'next/navigation';

const Room = () => {
    const { roomId } = useParams();
    const meetingElementRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const myMeeting = async () => {
            if (typeof roomId !== 'string') {
                console.error('Invalid roomId');
                return;
            }

            const appID = 1135378490;
            const serverSecret = "c9015afdecb2016e108f29434f1e23d9";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                'Ashik'
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: meetingElementRef.current!,
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                },
            });
        };

        myMeeting();
    }, [roomId]);

    return (
        <div className='min-h-screen flex justify-center items-center bg-slate-800'>
            <div ref={meetingElementRef} />
        </div>
    );
};

export default Room;
