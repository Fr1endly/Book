import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { saveChapter, editChapter } from "../../../actions/ruleBook";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginRight: "5px",
  },
}));

const options = ["News", "Rulebook chapter"];

const mapStateToprops = (state) => ({
  chapter: state.admin.chapter,
});

export default connect(mapStateToprops, { saveChapter, editChapter })(
  withRouter(
    ({
      match,
      saveChapter,
      editChapter,
      slateValue,
      edit,
      history,
      chapter,
    }) => {
      const classes = useStyles();
      const [option, setOption] = useState("");
      const [formValue, setFormValue] = useState({
        title: "",
        index: 0,
      });

      if (edit) {
        useEffect(() => {
          const { title, index } = chapter;
          setFormValue({ title, index });
        }, []);
      }

      const handleOptionChange = (e) => setOption(e.target.value);

      const handleChange = (e) => {
        setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        const chapter = {
          ...formValue,
          sections: JSON.stringify(slateValue),
        };

        if (edit) {
          editChapter(chapter, history, match.params.id);
        } else {
          saveChapter(chapter, history);
        }
      };

      return (
        <div className={classes.root}>
          {console.log(edit)}
          <div>
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              value={option}
              onChange={handleOptionChange}
              helperText="Please select content type."
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {option === "Rulebook chapter" ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="title"
                  value={formValue.title}
                  type="text"
                  label="Title"
                  className={classes.input}
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="index"
                  value={formValue.index}
                  label="Index"
                  className={classes.input}
                  type="number"
                />
              </div>
              <div>
                <Button type="submit" color="primary">
                  Save new chapter
                </Button>
              </div>
            </form>
          ) : null}
        </div>
      );
    }
  )
);
