const Collection = require("../schema/Collection");

class MongoDB {
  static async saveCollection({ title, images }) {
    try {
      const newCollection = new Collection({
        title,
        images
      });

      return await newCollection.save();
    } catch (error) {
      return {
        status: "failed",
        error
      };
    }
  }
}

module.exports = MongoDB;
