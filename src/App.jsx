import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import AudioPlayer from "./components/AudioPlayer";
import AudioTimeline from "./components/AudioTimeline";
import ImportMedia from "./components/ImportMedia";
import Projects from "./components/Projects";
import Button from "@mui/material/Button";

const MEDIA_TAB = "Media";
const PROJECTS_TAB = "Projects";

const LOCAL_STORAGE_KEY = "iAudioProjects";

const App = () => {
  const [tab, setTab] = useState(PROJECTS_TAB);
  const [projects, setProjects] = useLocalStorage(LOCAL_STORAGE_KEY, []);

  const onTabClick = (e, tabName) => {
    e.preventDefault();
    setTab(tabName);
  };

  onbeforeunload = (e) => {
    e.preventDefault();
    setProjects([]);
    e.returnValue = "";
  };

  const showMediaTab = () => {
    return (
      <>
        <div className="flex flex-row justify-between min-h-[450px]">
          <ImportMedia />
          <AudioPlayer />
        </div>
        <div className="bg-gray-300 min-h-[600px]">
          <AudioTimeline setTab={setTab} />
        </div>
      </>
    );
  };
  const showProjectsTab = () => {
    return <Projects setTab={setTab} />;
  };

  return (
    <div className="bg-black min-h-screen min-w-screen">
      <div className="bg-gray-700 flex flex-row justify-center items-center min-h-[80px]">
        <Button
          variant="contained"
          style={{
            backgroundColor: tab === MEDIA_TAB ? "grey" : "blue",
          }}
          onClick={(e) => {
            onTabClick(e, MEDIA_TAB);
          }}
        >
          Media
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: tab === PROJECTS_TAB ? "grey" : "blue" }}
          onClick={(e) => {
            onTabClick(e, PROJECTS_TAB);
          }}
        >
          Projects
        </Button>
      </div>
      {tab === MEDIA_TAB ? showMediaTab() : showProjectsTab()}
    </div>
  );
};

export default App;
