import React, { useState } from 'react'

const ChangingBackground = () => {

    const [videoIndex, setVideoIndex] = useState(0)

    const handleChangeBackground = () => {
        if (videoIndex >= vidArray.length - 1) {
            setVideoIndex(0);
        } else {
            setVideoIndex(videoIndex + 1)
        }
    }

    const vidArray = [
        "/backgroundVideos/foggy-forest.3840x2160.mp4",
        "/backgroundVideos/video1.mp4",
        "/backgroundVideos/Winter Forest Snow Live Wallpaper.mp4",
    ];

    const changeBackBtnStyle = {
        cursor: "pointer",
        padding: "10px 20px",
        background: "#fff",
        borderRadius: "5px",
        fontWeight: "bold",
        marginTop: "40px",
        position: "fixed" as "fixed",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "Poppins",
        zIndex: 1
    };

    const backgroundVideoStyle = {
        position: "absolute" as "absolute",
        right: 0,
        top: 0,
        width: "100%",
        objectFit: "cover" as "cover",
        height: "100vh",
        zIndex: -1,
        filter: "saturate(2.5)",
    };


    return (
        <div>
            <video src={vidArray[videoIndex]} loop muted autoPlay style={backgroundVideoStyle}></video>
            <div style={changeBackBtnStyle} onClick={handleChangeBackground}>
                Change Background
            </div>
        </div>
    )
}

export default ChangingBackground