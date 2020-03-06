import React from "react";
import FileInstallHandler from "./file-handler";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  root: {
    padding: 2
  }
}));
function installModule(file, displayProgressBar, updateProgressBarValue) {
  console.log(file);
  const data = new FormData();
  data.append("file", file);
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
    })
    .catch(error => {
      //module installation failure
    });
}
export default function InstallModule() {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
      <FileInstallHandler installModule={files => installModule(files)} />
    </Paper>
  );
}
