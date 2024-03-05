import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FileContextProvider } from "./contexts/FileContext";
import { TrackContextProvider } from "./contexts/TrackContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FileContextProvider>
      <TrackContextProvider>
        <App />
      </TrackContextProvider>
    </FileContextProvider>
  </React.StrictMode>
);
