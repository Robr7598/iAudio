import { useContext, useCallback } from "react";
import { FileContext } from "../contexts/FileContext";
import "react-h5-audio-player/lib/styles.css";
import Dropzone from "./Dropzone";
import ReorderList from "./ReorderList";

const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

const AudioTimeline = () => {
  const { playlist, setPlaylist } = useContext(FileContext);

  const handleFileUpload = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);

      audio.onloadedmetadata = () => {
        setPlaylist([
          ...playlist,
          {
            id: uniqueId(),
            src: audio.src,
            duration: audio.duration,
            name: file.name,
          },
        ]);
        audio.remove();
      };
    }
  });

  return (
    <div>
      <Dropzone
        onDrop={handleFileUpload}
        label="Drag and drop audio files from file browser to start creating
          your own clip!"
      ></Dropzone>
      <ReorderList />
    </div>
  );
};

export default AudioTimeline;
