import { useContext, useState } from "react";
import Dropzone from "./Dropzone";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import AudioPlayerBg from "../assets/AudioPlayerBg.jpeg";
import { FileContext } from "../contexts/FileContext";

const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

// Parent file store section of every project, the files here can be re-used.
const ImportMedia = () => {
  const [fileStore, setFileStore] = useState([]);
  const { playlist, setPlaylist } = useContext(FileContext);

  const handleFileUpload = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileStore([...fileStore, file]);
    }
  };

  const handleDelete = (e, index) => {
    e.preventDefault();
    const newFileStore = [...fileStore];
    newFileStore.splice(index, 1);
    setFileStore(newFileStore);
  };

  const handleAddFile = (e, index) => {
    e.preventDefault();
    if (index !== undefined) {
      const file = fileStore[index];
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
  };

  return (
    <div className="mt-[10px]">
      <div className="bg-gray-50 p-2 rounded-md ml-[470px]">
        <Dropzone
          onDrop={handleFileUpload}
          label="Import"
          clickEnabled={true}
        />
      </div>
      <div className="flex flex-row">
        {fileStore.length > 0 &&
          fileStore.map((file, index) => {
            return (
              <div
                key={index}
                className="ml-3 max-h-[100px] max-w-[170px] mt-[80px] flex flex-col justify-center"
                onDragStart={(e) => handleDrop(e, file)}
              >
                <div className="max-w-[170px] max-h-[100px]">
                  <img src={AudioPlayerBg} />
                </div>
                <div
                  className="draggable-item flex flex-row justify-between"
                  draggable
                >
                  {file.name}
                  <IconButton onClick={(e) => handleDelete(e, index)}>
                    <DeleteIcon variant="large" />
                  </IconButton>
                  <IconButton onClick={(e) => handleAddFile(e, index)}>
                    <AddTwoToneIcon variant="large" />
                  </IconButton>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImportMedia;
