import React from "react";
import FileInstallHandler from "./file-handler";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
function transition(props) {
  return <Slide {...props} direction="left" />;
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  paper: {
    padding: 2
  }
}));
function installModule(
  file,
  displayProgressBar,
  updateProgressBarValue,
  handleClick
) {
  const data = new FormData();
  data.append("module", file);
  displayProgressBar(true);
  // receive two parameter endpoint url ,form data
  axios
    .post("/modules", data, {
      onUploadProgress: progressEvent => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        console.log("onUploadProgress", totalLength);
        if (totalLength !== null) {
          updateProgressBarValue(
            Math.round((progressEvent.loaded * 100) / totalLength)
          );
        }
      }
    })
    .then(res => {
      //module installed
      let message = "Module has been installed";
      handleClick("success", message);
    })
    .catch(error => {
      //module installation failure
      let { message } = error.response.data.payload;
      handleClick("error", message);
    });
}
export default function InstallModule() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState(true);

  const handleClick = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Paper elevation={3} className={classes.paper}>
      <FileInstallHandler
        installModule={(files, displayProgressBar, updateProgressBarValue) =>
          installModule(
            files,
            displayProgressBar,
            updateProgressBarValue,
            handleClick
          )
        }
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={`${severity}`}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
