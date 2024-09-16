import React, { useState } from 'react'
import Timer from './Timer';
import Settings from './Settings';
import SettingsContext from './SettingsContext';



function PomodoroTimer() {


    const timerContainer = {
        position: "fixed" as "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        padding: "35px 40px",
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center" as "center",
        borderRadius: "36px",
        boxShadow: "0 0 20px rgba(26, 26, 26, 0.1), 0 0 40px rgba(26, 26, 26, 0.1), 0 0 80px rgba(26, 26, 26, 0.1)",
        backdropFilter: "blur(15px)",
        fontWeight: "600",
        zIndex: 2,
    };

    const [showSettings,setShowSettings] = useState<boolean>(false)
    const [workMinutes, setWorkMinutes] = useState<number>(25);
    const [breakMinutes, setBreakMinutes] = useState<number>(5);

    return (
        <main style={timerContainer}>
          <SettingsContext.Provider value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}>
            {showSettings ? <Settings /> : <Timer />}
          </SettingsContext.Provider>
        </main>
      );
    }

export default PomodoroTimer