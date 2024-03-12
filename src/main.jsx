import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FileContextProvider } from "./contexts/FileContext";
import { CurrentContextProvider } from "./contexts/CurrentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FileContextProvider>
      <CurrentContextProvider>
        <App />
      </CurrentContextProvider>
    </FileContextProvider>
  </React.StrictMode>
);
