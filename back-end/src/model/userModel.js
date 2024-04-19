const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  history: { type: String },
  watchlist: { type: String },
  likedComment: [{ type: String }],
  profilePicture: {
    type: String,
    default:
      "https://i.pinimg.com/originals/f6/5b/19/f65b1993fed9627bb88c1f562d77f34d.jpg",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
