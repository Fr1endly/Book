import React, { useCallback, useMemo, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  saveChapter,
  getChapterById,
  editChapter,
} from "../../actions/ruleBook";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { withLinks } from "./withLinks/withLinks";
import { withTables } from "./withTables/withTables";
import Toolbar from "./components/Toolbar";

import Element from "./Element";
import Leaf from "./Leaf";
import initialValue from "./InitialValue";
import CustomEditor from "./CustomEditor";
import { makeStyles } from "@material-ui/core/styles";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 500,
      margin: "auto",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 700,
    },
    height: "90%",
    overflow: "auto",
  },
  toolbar: {
    display: "flex",
  },
  editor: {
    background: "#fbfbf8",
    height: "85%",
    fontSize: "1rem",
  },
  input: {
    marginRight: theme.spacing(2),
  },
}));

const mapStateToProps = (state) => ({
  chapter: state.admin.chapter,
  chapters: state.ruleBook.chapters,
  chapterId: state.admin.chapterId,
});

//RICH TEXT EDITOR
export default connect(mapStateToProps, {
  saveChapter,
  getChapterById,
  editChapter,
})(
  withRouter(
    ({ getChapterById, match, chapter, chapterId, edit, sections }) => {
      const classes = useStyles();
      const [formValue, setFormValue] = useState({
        title: "",
        index: 0,
      });
      //Slate editor value
      const [value, setValue] = useState(initialValue);
      const renderElement = useCallback((props) => <Element {...props} />, []);
      const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
      const editor = useMemo(
        () => withTables(withLinks(withHistory(withReact(createEditor())))),
        []
      );

      const handleChange = (value) => setValue(value);

      // Load chapter for editing to admin user
      if (edit) {
        useEffect(() => {
          getChapterById(match.params.id);
          if (chapter) {
            setValue(JSON.parse(chapter.sections));
            const { index, title } = chapter;
            setFormValue({ title, index });
          }
        }, [getChapterById, match.params.id, chapterId]);
      }

      if (sections) {
        useEffect(() => {
          setValue(sections);
        }, []);
      }

      return (
        <div className={classes.root}>
          <Slate editor={editor} value={value} onChange={handleChange}>
            <Toolbar slateValue={value} edit={edit} />
            <Editable
              className={classes.editor}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    CustomEditor.toggleMark(editor, mark);
                  }
                }
              }}
            />
          </Slate>
        </div>
      );
    }
  )
);

// const handleSubmit = (e) => {
//   e.preventDefault();

//   const chapter = {
//     ...formValue,
//     sections: JSON.stringify(value),
//   };

//   if (edit) {
//     editChapter(chapter, history, match.params.id);
//   } else {
//     saveChapter(chapter, history);
//   }
// };
