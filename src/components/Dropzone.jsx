import { useDropzone } from "react-dropzone";
import Typography from "@mui/material/Typography";

const Dropzone = ({ children, onDrop, label, clickEnabled = false }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/*": [".mp3"] },
    maxFiles: 20,
    noClick: !clickEnabled,
  });

  return (
    <div {...getRootProps()} style={{ cursor: clickEnabled ? "pointer" : "" }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="h4" align="center">
          Drop the MP3 file here...
        </Typography>
      ) : (
        <Typography variant="h4" align="center">
          {label}
        </Typography>
      )}
      {children && children}
    </div>
  );
};

export default Dropzone;
