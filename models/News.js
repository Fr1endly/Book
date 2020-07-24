import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId },
    },
    {
      title: { type: String },
    },
    {
      text: { type: String },
    },
    {
      date: { type: Date, default: Date.now() },
    },
  ],
});

const News = mongoose.model("news", newsSchema);
export default News;
