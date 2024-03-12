import { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FileContext } from "../contexts/FileContext";
import { CurrentContext } from "../contexts/CurrentContext";
import IconButton from "@material-ui/core/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Typography from "@mui/material/Typography";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import AudioPlayerBg from "../assets/AudioPlayerBg.jpeg";

const LOCAL_STORAGE_KEY = "iAudioProjects";

// Main project list section which displays existing projects and allows us to create new projects
const Projects = ({ setTab }) => {
  const [projects, setProjects] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const { playlist, setPlaylist } = useContext(FileContext);
  const { setCurrentProjectId } = useContext(CurrentContext);

  const handleAddProject = () => {
    setPlaylist([]);
    setCurrentProjectId(null);
    setTab("Media");
  };

  const handlePlay = (e, id) => {
    e.preventDefault();
    setPlaylist([...playlist]);
    setCurrentProjectId(id);
    setTab("Media");
  };

  const handleDelete = (e, index) => {
    e.preventDefault();
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects([...newProjects]);
  };

  return (
    <div className="flex flex-row justify-start items-center mt-[100px]">
      <div className="border-2 border-gray-100 max-w-[300px] bg-gray-800 mr-[40px] ml-[30px]">
        <IconButton onClick={handleAddProject}>
          <AddOutlinedIcon style={{ fontSize: 100, color: "white" }} />
        </IconButton>
        <Typography variant="h6" align="center" style={{ color: "white" }}>
          Create New
        </Typography>
      </div>
      {projects?.map(({ id, name }, index) => {
        return (
          <div
            key={index}
            className="ml-[15px] min-h-[200px] max-w-[300px] flex flex-col justify-center"
          >
            <div className="max-w-[200px] max-h-[200px]">
              <img src={AudioPlayerBg} />
            </div>
            <div className="bg-gray-100 flex flex-row justify-between">
              <Typography
                variant="h6"
                style={{ paddingTop: "8px", paddingLeft: "8px" }}
              >
                {name}
              </Typography>
              <IconButton onClick={(e) => handlePlay(e, id)}>
                <PlayArrowRoundedIcon variant="large" />
              </IconButton>
              <IconButton onClick={(e) => handleDelete(e, index)}>
                <DeleteIcon variant="large" />
              </IconButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
