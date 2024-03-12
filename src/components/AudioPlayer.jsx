import { useState, useEffect, useContext, useRef, useMemo } from "react";
import { FileContext } from "../contexts/FileContext";
import { CurrentContext } from "../contexts/CurrentContext";
import Typography from "@mui/material/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";

const AudioPlayer = () => {
  const { playlist } = useContext(FileContext);
  const { currentTrackIndex, setCurrentTrackIndex } =
    useContext(CurrentContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.src = playlist[currentTrackIndex]?.src;
    if (isPlaying && audioRef.current.src) {
      audioRef.current.play();
    } else {
      setIsPlaying(false);
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (playlist.length === 0) {
      setIsPlaying(false);
      audioRef.current.src = null;
    }
  }, [playlist]);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const playPrevious = () => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex <= 0) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      newIndex = 0;
      setIsPlaying(false);
    }
    setCurrentTrackIndex(newIndex);
  };

  const playNext = () => {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= playlist.length) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      newIndex = 0;
      setIsPlaying(false);
    }
    setCurrentTrackIndex(newIndex);
  };

  return (
    <div className="border-2 rounded border-black min-h-100 bg-pink-400 min-w-[600px] flex flex-col justify-between">
      <Typography variant="h4" align="center">
        Now playing:
      </Typography>
      <Typography variant="h3" align="center">
        {playlist[currentTrackIndex]?.name}
      </Typography>
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]?.src}
        onEnded={playNext}
      ></audio>
      <div className="flex flex-row justify-between">
        <IconButton onClick={playPrevious}>
          <SkipPreviousRoundedIcon fontSize="large" />
        </IconButton>
        {playlist.length === 0 ? (
          <IconButton style={{ fontSize: 60 }}>
            <PlayArrowRoundedIcon fontSize="large" />
          </IconButton>
        ) : isPlaying ? (
          <IconButton onClick={togglePlay}>
            <PauseCircleFilledRoundedIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton onClick={togglePlay}>
            <PlayArrowRoundedIcon fontSize="large" />
          </IconButton>
        )}
        <IconButton onClick={playNext}>
          <SkipNextRoundedIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default AudioPlayer;
