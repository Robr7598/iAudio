import { createContext, useState } from "react";

const TrackContext = createContext();

const TrackContextProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  return (
    <TrackContext.Provider value={{ currentTrackIndex, setCurrentTrackIndex }}>
      {children}
    </TrackContext.Provider>
  );
};

export { TrackContext, TrackContextProvider };
