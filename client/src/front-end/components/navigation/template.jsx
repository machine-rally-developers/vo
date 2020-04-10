import React, { useState } from "react";
import { Chip, Box, Slide, Fab } from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { conversation } from "../../graphql/frontend-query";
import { useQuery, useMutation } from "@apollo/react-hooks";
import DomPurify from "dompurify";
import isHTML from "is-html";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    //minHeight: "100vh",
    width: "100%"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
    border: "1px solid grey",
    margin: "5px",
    padding: "10px",
    overflowY: "scroll"
  },
  innerBox: {
    display: "block"
  },
  clear: {
    clear: "both"
  },
  textField: {
    margin: "5px"
  },
  chipQuestion: {
    float: "left",
    fontSize: 20,
    //background: "#f8f9fa",
    background: "linear-gradient(45deg, #f8f9fa 30%, #fff 90%)",
    margin: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5
  },
  chipAnswer: {
    float: "right",
    fontSize: 20,
    margin: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    background: "linear-gradient(45deg, #6610f2 30%, #6f42c1 90%)",
    color: "white"
  },
  settingsIcon: {
    float: "right"
  }
});
const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75"
  },
  iconHover: {
    color: "#ff3d47"
  }
})(Rating);
/**
 * Get answer related to the question from the server
 @param addToHistory {String<Object>} a callback function to update the history of the conversation
 */
function getAnswer(e, addToHistory, inputValue, converse) {
  //check if the user pressed enter and the input text is valid
  if (
    e.keyCode === 13 &&
    inputValue !== undefined &&
    inputValue.trim().length >= 3
  ) {
    console.log("Hello" + inputValue);
    //axios
    converse({ variables: { question: inputValue } }).then(result => {
      console.log(result.data.conversation);
      let { question, answer } = result.data.conversation;
      answer = DomPurify.sanitize(answer);
      addToHistory({ answer, question });
    });
    //addToHistory({ answer: "World", question: "Hello" });
  }
}
/**
 * Creates a template for the front end
 */
export default function Template() {
  const name = "Andrew";
  const [inputValue, setInputValue] = useState("");
  const [converse] = useMutation(conversation);
  const updateInputValue = (value: string) => {
    setInputValue(value);
  };
  const [history, setHistory] = useState([
    {
      question: `Hello ${name}, how can I help you`
    },
    {
      question: `What is the weather`,
      answer: `The weather is 14 degree and rainy`
    }
  ]);
  const classes = useStyles();
  const addToHistory = ({ answer, question }) => {
    setHistory([...history, { answer, question }]);
  };
  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        {history.map((item, index) => {
          return (
            <div key={index} className={classes.innerBox}>
              <div>
                <Slide direction="right" in={true}>
                  <Chip
                    variant="outlined"
                    size="medium"
                    label={`${item.question}`}
                    className={classes.chipQuestion}
                  />
                </Slide>
              </div>
              <br className={classes.clear} />
              {item.answer ? (
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Slide direction="left" in={true}>
                    {isHTML(item.answer) ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: `${item.answer}` }}
                      ></div>
                    ) : (
                      <Chip
                        variant="outlined"
                        size="medium"
                        label={item.answer}
                        className={classes.chipAnswer}
                        danger="true"
                      />
                    )}
                  </Slide>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">
                      Was the answer relevant?
                    </Typography>
                    <StyledRating
                      name="customized-color"
                      defaultValue={2}
                      getLabelText={value =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={0.5}
                      icon={<FavoriteIcon fontSize="inherit" />}
                    />
                  </Box>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </Box>
      <TextField
        id="outlined-search"
        label="Ask Question"
        type="text"
        variant="outlined"
        className={classes.textField}
        onKeyUp={e => {
          getAnswer(e, addToHistory, inputValue, converse);
        }}
        onChange={e => {
          updateInputValue(e.target.value);
        }}
      />
      <Fab
        color="primary"
        aria-label="settings"
        className={classes.settingsIcon}
      >
        <SettingsIcon />
      </Fab>
    </div>
  );
}
