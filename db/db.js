const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: false,
  },
  title: {
    type: String,
    required: true,
    trim: false,
  },
  subtitle: {
    type: String,
    required: true,
    trim: false,
  },
  intro: {
    type: String,
    required: true,
    trim: false,
  },
  sections: {
    type: Array,
    required: true,
    trim: false,
  },
  uri: {
    type: String,
    required: true,
    trim: true,
  },
});

const NewsModel = mongoose.model("News", newsSchema);
module.exports = NewsModel;