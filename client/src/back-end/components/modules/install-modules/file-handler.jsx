import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import "typeface-roboto";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  /*root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },*/
  root: {
    textAlign: "center"
  },
  linearProgress: {
    margin: 4
  }
}));
function transition(props) {
  return <Slide {...props} direction="left" />;
}
export default function FileInstallHandler(props) {
  const classes = useStyles();
  const [files, setFiles] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [progressBarIsVisible, setProgressBarIsVisible] = React.useState(false);
  const [progressBarValue, setProgressBarValue] = React.useState(0);
  const displayProgressBar = value => {
    setProgressBarIsVisible(value);
  };
  const updateProgressBarValue = value => {
    setProgressBarValue(value);
  };
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      if (acceptedFiles[0].type.includes("application/x-zip-compressed")) {
        props.installModule(
          acceptedFiles[0],
          displayProgressBar,
          updateProgressBarValue
        );
      } else {
        setMessage("Please choose a module archive (.zip)");
        setOpen(true);
      }
    } else {
      setMessage("Please choose a module to install");
      setOpen(true);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: "application/x-zip-compressed" });

  return (
    <div className={classes.root}>
      <div
        {...getRootProps({ onClick: event => console.log(event) })}
        style={{
          padding: "10px",
          margin: "5px",
          border: "1px dashed grey",
          backgroundColor: "#fff"
        }}
      >
        <input
          {...getInputProps({
            accept: "application/x-zip-compressed",
            multiple: false
          })}
        />

        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop modules here</p>
        )}
        <em>(Only .zip files will be accepted)</em>
      </div>

      {progressBarIsVisible ? (
        <Box>
          <Typography variant="caption" style={{ marginTop: 10 }}>
            <strong>Installing Module..</strong>
          </Typography>
          <LinearProgress
            className={classes.linearProgress}
            variant="determinate"
            value={progressBarValue}
            color="primary"
          />
        </Box>
      ) : (
        <div></div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={`bottom,right`}
        open={open}
        onClose={handleClose}
        message={message}
        TransitionComponent={transition}
      />
    </div>
  );
}
