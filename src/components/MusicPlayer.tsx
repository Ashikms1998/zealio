"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPauseCircle, faForward, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
const url = process.env.NEXT_PUBLIC_API_URL;



const MusicPlayer = () => {
    const currentAudio = useRef<HTMLAudioElement | null>(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
    const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
    const [audioProgress, setAudioProgress] = useState(0);

    const [musicIndex, setMusicIndex] = useState(0);
    const [currentMusicDetails, setCurrentMusicDetails] = useState({
        songName: 'Nila',
        songArtist: 'Keethan',
        songSrc: '/songs/Keethan_Nila_ft_Jimmy_Francis_John_Shravan_Sridhar_7VdKkZTC6vE_140.mp3',
        songAvatar: '/songs/image/thumbnail.jpg'
    })

    const musicAPI = [
        {
            songName: 'Nila',
            songArtist: 'Keethan',
            songSrc: '/songs/Keethan_Nila_ft_Jimmy_Francis_John_Shravan_Sridhar_7VdKkZTC6vE_140.mp3',
            songAvatar: '/songs/image/thumbnail.jpg'
        },
        {
            songName: 'Rain Sound',
            songArtist: 'Rasool Pookutti',
            songSrc: '/songs/Rain_sound.mp3',
            songAvatar: '/songs/image/bliss.jpg'
        },

    ]


    const handleAudioPlay = () => {
        if (currentAudio.current) {
            if (currentAudio.current.paused) {
                currentAudio.current.play();
                setIsAudioPlaying(true);
            } else {
                currentAudio.current.pause();
                setIsAudioPlaying(false);
            }
        }
    };

    const handleNextSong = () => {
        if (musicIndex >= musicAPI.length - 1) {
            let setNumber = 0;
            setMusicIndex(setNumber);
            updateCurrentMusicDetails(setNumber);
        } else {
            let setNumber = musicIndex + 1;
            setMusicIndex(setNumber)
            updateCurrentMusicDetails(setNumber);
        }
    }

    const handlePrevSong = () => {
        if (musicIndex === 0) {
            let setNumber = musicAPI.length - 1;
            setMusicIndex(setNumber);
            updateCurrentMusicDetails(setNumber);
        } else {
            let setNumber = musicIndex - 1;
            setMusicIndex(setNumber)
            updateCurrentMusicDetails(setNumber);
        }
    }

    const updateCurrentMusicDetails = (number: number) => {
        let musicObject = musicAPI[number];
        if (currentAudio.current) {
            currentAudio.current.src = musicObject.songSrc;
            currentAudio.current.play();
        }
        setCurrentMusicDetails({
            songName: musicObject.songName,
            songArtist: musicObject.songArtist,
            songSrc: musicObject.songSrc,
            songAvatar: musicObject.songAvatar
        })
        setIsAudioPlaying(true);
    }


    const handleAudioUpdate = () => {
        if (currentAudio.current) {
            let minutes = Math.floor(currentAudio.current.duration / 60);
            let seconds = Math.floor(currentAudio.current.duration % 60);
            let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
            setMusicTotalLength(musicTotalLength0);

            //Input Music Current Time
            let currentMin = Math.floor(currentAudio.current.currentTime / 60);
            let currentSec = Math.floor(currentAudio.current.currentTime % 60);
            let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
            setMusicCurrentTime(musicCurrentT);

            const progress = Math.floor((currentAudio.current!.currentTime / currentAudio.current!.duration) * 100);
            setAudioProgress(isNaN(progress) ? 0 : progress)
        }
    }

    const handleMusicProgressBar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentAudio.current) {
            setAudioProgress(Number(e.target.value));

            currentAudio.current.currentTime =
                (Number(e.target.value) * currentAudio.current.duration) / 100;
        }

    }


    const containerStyle = {
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "var(--mainColor)",
        fontFamily: "Poppins",
    };



    const musicContainer = {
        width: "300px",
        padding: "20px 40px",
        display: "flex",
        flexDirection: "column" as "column",
        position: "fixed" as "fixed",
        bottom: "16px",
        right: "16px",
        alignItems: "center",
        textAlign: "center" as "center",
        borderRadius: "36px",
        boxShadow: "0 0 20px rgba(26, 26, 26, 0.1), 0 0 40px rgba(26, 26, 26, 0.1), 0 0 80px rgba(26, 26, 26, 0.1)",
        backdropFilter: "blur(15px)",
        fontWeight: "600",
    };
    const musicHeadName = {
        margin: "0 auto",
        fontSize: "1rem",
        textAlign: "center" as "center",
    };
    const musicPlayer = {
        margin: "0",
        marginBottom: "10px",
        color: "var(--mainLightColor)"
    }

    const musicArtistName = {
        color: "var(--mainDimColor)",
        margin: "4px 0",
        fontSize: "1rem",
        fontWeight: "400",
    }

    const musicTimerDivStyle = {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        fontWeight: 400,
    };

    const musicProgressBarStyle = {
        width: "100%",
        marginBottom: "16px",
        height: "10px",
        borderRadius: "5px",
        outline: "none",
        filter: "hue-rotate(20deg)",
    };

    const playBtnStyle = {
        fontSize: "32px",
        padding: "5px 5px",
        color: "var(--mainColor)",
        cursor: "pointer",
        fontWeight: 400,
    };

    const musicControllerStyle = {
        cursor: "pointer",
        fontSize: "28px",
        padding: "5px 5px",
        color: "var(--mainColor)",
    };

    return (
        <>
            <div style={containerStyle}>

                <div>

                    <div style={musicContainer}>
                        <audio src='/songs/Keethan_Nila_ft_Jimmy_Francis_John_Shravan_Sridhar_7VdKkZTC6vE_140.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate} ></audio>
                        {/* <p style={musicPlayer}>Music Player</p> */}
                        <p style={musicHeadName}>{currentMusicDetails.songName}</p>
                        <p style={musicArtistName}>{currentMusicDetails.songArtist}</p>
                        <img src={currentMusicDetails.songAvatar} className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg" alt="song Avatar" id='songAvatar' />
                        <div style={musicTimerDivStyle}>
                            <p className='musicCurrentTime'>{musicCurrentTime}</p>
                            <p className='musicTotalLenght'>{musicTotalLength}</p>
                        </div>
                        <input type="range" name="musicProgressBar" style={musicProgressBarStyle} value={audioProgress} onChange={handleMusicProgressBar} />
                        <div className="musicControlers" style={musicControllerStyle} >
                            <FontAwesomeIcon icon={faBackward} style={musicControllerStyle} onClick={handlePrevSong} />
                            <FontAwesomeIcon icon={isAudioPlaying ? faPauseCircle : faCirclePlay} style={playBtnStyle} onClick={handleAudioPlay} />
                            <FontAwesomeIcon icon={faForward} style={musicControllerStyle} onClick={handleNextSong} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default MusicPlayer;
