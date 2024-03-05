import React from "react";
import AudioPlayer from "./components/AudioPlayer";
import AudioTimeline from "./components/AudioTimeline";
import ImportMedia from "./components/ImportMedia";

const App = () => {
  return (
    <div className="bg-gray-700 min-h-screen min-w-screen">
      <div className="flex flex-row justify-between min-h-[450px]">
        <ImportMedia />
        <AudioPlayer />
      </div>
      <div className="bg-gray-400 min-h-[600px]">
        <AudioTimeline />
      </div>
    </div>
  );
};

export default App;
