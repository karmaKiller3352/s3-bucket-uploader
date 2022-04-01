const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  title: String,
  images: [
    {
      url: String,
      key: String
    }
  ]
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
