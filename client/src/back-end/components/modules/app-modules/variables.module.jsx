/**
 *Displays variable used by a module. You can also add variables if required by Modules
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VariableTable from "./variables.table.module.jsx";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));
export default function Variables({ variables, name, id, refetch }) {
  console.log(name);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ExpansionPanel
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>Variables</Typography>
        <Typography className={classes.secondaryHeading}>
          Variables that <strong>{name}</strong> module uses
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <VariableTable variables={variables} id={id} refetch={refetch} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
