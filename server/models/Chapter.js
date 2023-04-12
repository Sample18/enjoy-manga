const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: [{ type: String, required: true }],
    mangaId: { type: Schema.Types.ObjectId, ref: "Product" },
    name: String,
    number: String,
  },
  {
    timestamps: { createdAt: "date" },
  }
);

module.exports = model("Chapter", schema);
