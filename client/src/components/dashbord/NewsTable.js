import React from "react";
import { connect } from "react-redux";

const NewsList = ({ news }) => {
  return (
    <div>
      <ul>
        {news.map((newsItem) => (
          <li>{newsItem.title}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news.news,
});

export default connect(mapStateToProps)(NewsList);
