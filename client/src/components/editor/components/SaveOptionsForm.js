import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { saveChapter, editChapter } from "../../../actions/ruleBook";
import { saveNewsPost } from "../../../actions/news";
import { closeModal } from "../../../actions/layout";
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

export default connect(mapStateToprops, {
  saveChapter,
  editChapter,
  saveNewsPost,
  closeModal,
})(
  withRouter(
    ({
      match,
      saveChapter,
      editChapter,
      saveNewsPost,
      closeModal,
      slateValue,
      edit,
      history,
      chapter,
    }) => {
      const classes = useStyles();
      const [option, setOption] = useState("");
      const [chapterValue, setChapterValue] = useState({
        title: "",
        index: 0,
      });
      const [newsTitle, setNewsTitle] = useState("");

      if (edit) {
        useEffect(() => {
          const { title, index } = chapter;
          setChapterValue({ title, index });
        }, [chapter]);
      }

      const handleOptionChange = (e) => setOption(e.target.value);

      const handleChange = (e) => {
        setChapterValue({
          ...chapterValue,
          [e.target.name]: e.target.value,
        });
      };

      const handleNewsTitleChange = (e) => setNewsTitle(e.target.value);

      const handleSubmit = (e) => {
        e.preventDefault();

        if (option === "Rulebook chapter") {
          const chapter = {
            ...chapterValue,
            sections: JSON.stringify(slateValue),
          };

          if (edit) {
            editChapter(chapter, history, match.params.id);
            closeModal();
          } else {
            saveChapter(chapter, history);
            closeModal();
          }
        } else if (option === "News") {
          const text = JSON.stringify(slateValue);
          const newsPost = {
            title: newsTitle,
            text,
          };
          saveNewsPost(newsPost);
          closeModal();
        }
      };

      const newsSection = (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <TextField
              onChange={(e) => handleNewsTitleChange(e)}
              name="title"
              value={newsTitle}
              type="text"
              label="Title"
              className={classes.input}
            />
          </div>
          <div>
            <Button type="submit" color="primary">
              Save news post.
            </Button>
          </div>
        </form>
      );

      return (
        <div className={classes.root}>
          <div>
            <TextField
              id="select-content"
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
                  value={chapterValue.title}
                  type="text"
                  label="Title"
                  className={classes.input}
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => handleChange(e)}
                  name="index"
                  value={chapterValue.index}
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
          ) : (
            newsSection
          )}
        </div>
      );
    }
  )
);
