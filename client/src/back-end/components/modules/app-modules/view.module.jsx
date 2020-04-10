/**
 * View details about each module
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Info from "@material-ui/icons/Info";
import SdStorage from "@material-ui/icons/SdStorage";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import Variables from "./variables.module";
import { getInstalledModuleById } from "../../../graphql/backend-query";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "90vh"
  },
  bottomNavigation: {
    background: "white",
    alignSelf: "center",
    bottom: 10,
    width: "100%",
    border: "1px solid rgba(0,0,0, 0.1)",
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 4
  },
  loadingPaper: {
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 6,
    marginBottom: 6,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    fontSize: 20
  },
  paper: {
    height: "80%"
  }
});
function transition(props) {
  return <Slide {...props} direction="left" />;
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ViewModule(props) {
  const { id } = props.match.params;
  console.log("[ViewModule]");
  console.log(id);
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const { loading, error, data, refetch } = useQuery(getInstalledModuleById, {
    variables: { id }
  });
  if (loading)
    return (
      <Paper elevation={3} className={classes.loadingPaper}>
        <span>Loading...</span>
        <CircularProgress />
      </Paper>
    );
  if (error)
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error">
          {error.message}
        </Alert>
      </Snackbar>
    );
  const { variables, name } = data.getInstalledModuleById[0];
  return (
    <Container fixed className={classes.root}>
      <Variables variables={variables} name={name} id={id} refetch={refetch} />
    </Container>
  );
}
