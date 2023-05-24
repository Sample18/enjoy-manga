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
    rate: {
      rating1: Number,
      rating2: Number,
      rating3: Number,
      rating4: Number,
      rating5: Number,
    },
    moderateStatus: {
      type: String,
      enum: ["onCheck", "accepted", "notAccepted"],
    },
    uploadBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "date" },
  }
);

module.exports = model("Product", schema);
