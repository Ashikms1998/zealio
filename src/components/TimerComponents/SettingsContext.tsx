import React from 'react';

interface SettingsContextType {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  workMinutes: number;
  breakMinutes: number;
  setWorkMinutes: (minutes: number) => void;
  setBreakMinutes: (minutes: number) => void;
}

const SettingsContext = React.createContext<SettingsContextType>({} as SettingsContextType);

export default SettingsContext;