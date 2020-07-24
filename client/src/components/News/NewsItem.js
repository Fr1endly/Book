import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNewsByTitle } from "../../actions/news";
import CustomEditor from "../editor/CustomEditor";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { startCase } from "lodash";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
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
  pageTitle: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
  paper: {
    padding: spacing(2),
    marginBottom: spacing(4),
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
    // "& p:after": {
    //   content: "''",
    //   display: "inline-block",
    //   width: "0px",
    // },
  },
}));

const NewsItem = ({ match, getNewsByTitle, newsItem }) => {
  useEffect(() => {
    getNewsByTitle(match.params.title);
  }, [getNewsByTitle, match.params.title]);

  const date = newsItem ? new Date(newsItem.date) : null;

  const classes = useStyles();
  const text = newsItem ? (
    <>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        className={classes.pageTitle}
      >
        {startCase(newsItem.title)}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography style={{ marginRight: "5px" }} variant="overline">
          {newsItem.author}
        </Typography>
        <Typography variant="overline">
          {date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear()}
        </Typography>
      </div>
      <div
        className={classes.content}
        dangerouslySetInnerHTML={{
          __html: CustomEditor.serialiseHtmlFromValue(
            JSON.parse(newsItem.text)
          ),
        }}
      ></div>
    </>
  ) : null;
  return <div className={classes.root}>{text}</div>;
};

const mapStateToProps = (state) => ({
  newsItem: state.news.newsItem,
});

export default connect(mapStateToProps, { getNewsByTitle })(NewsItem);
