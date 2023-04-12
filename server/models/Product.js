const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    author: String,
    category: { type: String, enum: ["Манга", "Манхва"] },
    cover: String,
    description: String,
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    name: String,
    nameRu: String,
    rate: Number,
  },
  {
    timestamps: { createdAt: "date" },
  }
);

module.exports = model("Product", schema);
