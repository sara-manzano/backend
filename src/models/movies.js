const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    plot: { type: String },
    genres: [{ type: String }],
    runtime: { type: Number },
    cast: [{ type: String }],
    num_mflix_comments: { type: Number, default: 0 },
    poster: { type: String },
    title: { type: String, required: true },
    lastupdated: { type: String },
    languages: [{ type: String }],
    released: { type: Date },
    directors: [{ type: String }],
    writers: [{ type: String }],
    awards: {
      wins: { type: Number },
      nominations: { type: Number },
      text: { type: String },
    },
    year: { type: Number },
    imdb: {
      rating: { type: Number },
      votes: { type: Number },
      id: { type: Number },
    },
    countries: [{ type: String }],
    type: { type: String },
    tomatoes: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
