import { createContext, useState } from "react";

const FileContext = createContext();

const FileContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  return (
    <FileContext.Provider value={{ playlist, setPlaylist }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileContextProvider };
