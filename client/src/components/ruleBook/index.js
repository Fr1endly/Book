import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CustomEditor from "../editor/CustomEditor";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { startCase } from "lodash";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: 16,
    [breakpoints.up("sm")]: {
      padding: 24,
      maxWidth: 500,
      margin: "auto",
    },
    [breakpoints.up("md")]: {
      maxWidth: 700,
    },
  },
  content: {
    fontFamily: "Roboto",
    maxWidth: "700px",
    margin: "0 auto",
    fontSize: "18px",
    fontWeight: "300",

    "& p": {
      fontSize: "1em",
      lineHeight: "1.5em",
      marginBottom: "1.5em",
      marginTop: "1.5em",
    },
    "& h4": {
      fontSize: "1.166em",
      lineHeight: "1.286em",
      marginBottom: "1.286em",
      marginTop: "1.286em",
    },
    "& h3": {
      fontSize: "1.5em",
      lineHeight: "1em",
      marginBottom: "1em",
      marginTop: "0",
    },
    "& table": {
      border: "1px solid black",
      borderCollapse: "collapse",
      width: "100%",
    },
    "& td": {
      border: "2px solid #ddd",
      padding: "10px",
    },
    "& p:after": {
      content: "''",
      display: "inline-block",
      width: "0px",
    },
  },
}));

const mapStateToProps = (state) => ({
  chapters: state.ruleBook.chapters,
});

export default connect(mapStateToProps)(
  withRouter(({ match, chapters }) => {
    const classes = useStyles();
    let activeChapter;

    if (chapters) {
      activeChapter = chapters.filter(
        (chapter) => chapter.title === match.params.title
      )[0];
    }

    const htmlContent = activeChapter
      ? CustomEditor.serialiseHtmlFromValue(JSON.parse(activeChapter.sections))
      : null;

    const heading = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h3">
          {startCase(activeChapter ? activeChapter.title : undefined)}
        </Typography>
        <Typography variant="overline">
          Chapter: {activeChapter ? activeChapter.index : undefined} /{" "}
          {chapters.length - 1}
        </Typography>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        {activeChapter ? heading : null}
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  })
);
