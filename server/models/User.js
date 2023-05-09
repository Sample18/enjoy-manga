const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    reading: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    sex: { type: String, enum: ["male", "female", "other"] },
    role: { type: String, enum: ["admin", "moderator", "user"] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
