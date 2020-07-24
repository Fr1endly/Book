import React from "react";
import { connect } from "react-redux";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { startCase } from "lodash";
import CustomEditor from "../editor/CustomEditor";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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
    marginBottom: spacing(3),
    textAlign: "center",
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

const NewsList = ({ news }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="primary" className={classes.pageTitle}>
        NEWS
      </Typography>

      {news.map((newsItem) => {
        const date = new Date(newsItem.date);
        return (
          <div className={classes.paper} key={newsItem.title}>
            <Typography
              variant="h5"
              color="primary"
              style={{ textTransform: "uppercase" }}
            >
              {startCase(newsItem.title)}
            </Typography>
            <Divider />
            <div
              style={{
                display: "flex",
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
                  JSON.parse(newsItem.text).slice(0, 1)
                ),
              }}
            ></div>
            <Link
              component={RouterLink}
              color="inherit"
              to={`/news/${newsItem.title}`}
            >
              comments
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news.news,
});

export default connect(mapStateToProps)(NewsList);
