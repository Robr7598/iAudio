import { useRef, useContext } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FileContext } from "../contexts/FileContext";
import { CurrentContext } from "../contexts/CurrentContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AudioPlayerBg from "../assets/AudioPlayerBg.jpeg";

// Handles the re-ordering of audio files on the audio timeline

const Card = ({ id, name, index, moveFile }) => {
  const { playlist, setPlaylist } = useContext(FileContext);
  const { currentTrackIndex, setCurrentTrackIndex } =
    useContext(CurrentContext);
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "audio/mpeg",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveFile(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "audio/mpeg",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleDelete = (e, index) => {
    e.preventDefault();
    playlist.splice(index, 1);
    setPlaylist([...playlist]);

    if (index === currentTrackIndex) {
      setCurrentTrackIndex(0);
    }
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="ml-[15px] min-h-[400px] max-w-[300px] flex flex-col justify-center"
    >
      <div
        className="max-w-[300px] max-h-[300px]"
        style={{
          borderTop: index === currentTrackIndex ? "4px solid green" : "",
          borderLeft: index === currentTrackIndex ? "4px solid green" : "",
          borderRight: index === currentTrackIndex ? "4px solid green" : "",
        }}
      >
        <img src={AudioPlayerBg} />
      </div>
      <div
        className="draggable-item flex flex-row justify-between"
        style={{
          borderBottom: index === currentTrackIndex ? "4px solid green" : "",
          borderLeft: index === currentTrackIndex ? "4px solid green" : "",
          borderRight: index === currentTrackIndex ? "4px solid green" : "",
        }}
      >
        {name}
        <IconButton onClick={(e) => handleDelete(e, index)}>
          <DeleteIcon variant="large" />
        </IconButton>
      </div>
    </div>
  );
};

const List = () => {
  const { playlist, setPlaylist } = useContext(FileContext);
  const moveFile = (dragIndex, hoverIndex) => {
    const dragFile = playlist[dragIndex];
    setPlaylist((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragFile);
      return newItems;
    });
  };

  return (
    <div className="flex flex-row">
      {playlist.length > 0 &&
        playlist.map(({ id, name }, index) => {
          return (
            <Card
              key={index}
              id={id}
              name={name}
              index={index}
              moveFile={moveFile}
            ></Card>
          );
        })}
    </div>
  );
};

const ReorderListDnd = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <List />
    </DndProvider>
  );
};

export default ReorderListDnd;
