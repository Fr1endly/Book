import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  index: {
    type: Number,
    required: true
  },
  sections: {
    type: String
  }
});

const Chapter = mongoose.model("chapter", chapterSchema);
export default Chapter;
