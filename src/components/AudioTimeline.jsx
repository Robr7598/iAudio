import { useState, useContext, useCallback, useEffect } from "react";
import { FileContext } from "../contexts/FileContext";
import { CurrentContext } from "../contexts/CurrentContext";
import "react-h5-audio-player/lib/styles.css";
import Dropzone from "./Dropzone";
import ReorderList from "./ReorderList";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useLocalStorage from "../hooks/useLocalStorage";

const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

const LOCAL_STORAGE_KEY = "iAudioProjects";

const AudioTimeline = ({ setTab }) => {
  const [projects, setProjects] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const { playlist, setPlaylist } = useContext(FileContext);
  const { currentProjectId } = useContext(CurrentContext);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const currentProject = projects.find(({ id }) => id === currentProjectId);
    if (currentProject) {
      setPlaylist([...currentProject?.playlist]);
      setProjectName(currentProject.name);
    } else {
      setPlaylist([]);
      if (projects?.length > 0) {
        setProjectName(`Project-${projects.length + 1}`);
      } else {
        setProjectName("Project-1");
      }
    }
  }, [currentProjectId]);

  const onSaveTrack = () => {
    let newProjects = [];

    const currentProject = projects.find(({ id }) => id === currentProjectId);

    if (currentProject?.id != null) {
      newProjects = projects.filter(({ id }) => id !== currentProject.id);
    } else {
      newProjects = [...projects];
    }

    newProjects.push({
      id: currentProjectId != null ? currentProjectId : uniqueId(),
      name: projectName,
      playlist: playlist,
    });

    setProjects([...newProjects]);
    setTab("Projects");
  };

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

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  return (
    <div>
      <Dropzone
        onDrop={handleFileUpload}
        label="Drag and drop audio files from file browser to start creating
          your own clip!"
      ></Dropzone>
      <ReorderList />
      <div className="absolute bottom-0 right-0 pb-[10px] pr-[10px]">
        <TextField
          label="Project Name"
          variant="filled"
          onChange={handleProjectNameChange}
          value={projectName}
          style={{ marginRight: "10px" }}
        ></TextField>
        <Button
          variant="contained"
          onClick={onSaveTrack}
          disabled={playlist.length === 0 && currentProjectId == null}
          style={{
            color: "white",
            backgroundColor:
              playlist?.length === 0 && currentProjectId == null ? "" : "blue",
          }}
        >
          Save Track
        </Button>
      </div>
    </div>
  );
};

export default AudioTimeline;
