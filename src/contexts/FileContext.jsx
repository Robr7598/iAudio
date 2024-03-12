import { createContext, useState } from "react";

const FileContext = createContext();

// To use the playlist of the current project.
const FileContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  return (
    <FileContext.Provider value={{ playlist, setPlaylist }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileContextProvider };
