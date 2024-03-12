import { createContext, useState } from "react";

const CurrentContext = createContext();

// To use the current track index, current project being worked upon etc.
const CurrentContextProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentProjectId, setCurrentProjectId] = useState();
  return (
    <CurrentContext.Provider
      value={{
        currentTrackIndex,
        setCurrentTrackIndex,
        currentProjectId,
        setCurrentProjectId,
      }}
    >
      {children}
    </CurrentContext.Provider>
  );
};

export { CurrentContext, CurrentContextProvider };
