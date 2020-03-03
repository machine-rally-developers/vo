import { Chip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyle = makeStyles({
  root: {
    display: "flex"
  }
});
export default function Template() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        id="outlined-search"
        label="Ask Question"
        type="search"
        variant="outlined"
      />
    </div>
  );
}
