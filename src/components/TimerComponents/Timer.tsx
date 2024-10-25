import React, { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

const red = '#32aab3';
const green = '#4aec8c';



function Timer() {
    const settingsInfo = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [mode, setMode] = useState<'Work' | 'Break'>('Work');
    const [secondsLeft, setSecondsLeft] = useState<number>(0);

    const secondsLeftRef = useRef<number>(secondsLeft);
    const isPausedRef = useRef<boolean>(isPaused);
    const modeRef = useRef<'Work' | 'Break'>(mode);
    const [notificationSound, setNotificationSound] = useState<HTMLAudioElement | null>(null);


    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }
    useEffect(() => {
        const notificationSound = new Audio('/songs/Notificationding.mp3');
        setNotificationSound(notificationSound);
        
        return () => {
            notificationSound.pause();
            notificationSound.src = "";
        };
    }, []);

    useEffect(() => {
        function switchMode() {
            const nextMode = modeRef.current === 'Work' ? 'Break' : 'Work';
            const nextSeconds = (nextMode === 'Work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

            if (notificationSound) {
            notificationSound.play();
            }
            setMode(nextMode);
            modeRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [settingsInfo]);

    const totalSeconds = mode === 'Work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds: string | number = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div>
            <CircularProgressbar
                value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                    textColor: '#fff',
                    pathColor: mode === 'Work' ? red : green,
                    trailColor: 'rgba(255,255,255,.2)',

                })}
            />
            <div style={{ marginTop: '20px' }}>
                {isPaused
                    ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
                    : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
            </div>
            <div style={{ marginTop: '20px', display: "flex", justifyContent: "center"}}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>
        </div>
    );
}

export default Timer;