/**
 *Lists all modules installed in the app
 */
import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  listInstalledModules,
  deleteInstalledModule
} from "../../../graphql/backend-query";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  paper: {
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
  table: {
    minWidth: 700
  }
}));
/*const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);*/

function transition(props) {
  return <Slide {...props} direction="left" />;
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Modules() {
  const { loading, error, data, refetch } = useQuery(listInstalledModules);
  const [deleteModule] = useMutation(deleteInstalledModule);
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleDelete = id => {
    console.log(id);
    deleteModule({ variables: { id } });
    refetch();
  };
  if (loading)
    return (
      <Paper elevation={3} className={classes.paper}>
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
        <Alert onClose={handleClose} severity="danger">
          {error.message}
        </Alert>
      </Snackbar>
    );
  //const { listInstalledModules } = data;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>
                <strong>Modules</strong>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                <strong>Summary</strong>
              </Typography>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.listInstalledModules.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Chip label={`${row.name}`} color="primary" />
              </TableCell>
              <TableCell align="left">{row.summary.trim()}</TableCell>
              <TableCell align="left">
                <Button variant="contained" color="primary">
                  View
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(row._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
