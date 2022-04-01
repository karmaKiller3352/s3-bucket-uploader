const MongoDB = require("../services/MongoDB");

class GalleryController {
  static async post(req, res) {
    const images = req.files.map((file) => ({
      url: file.location,
      key: file.key
    }));

    const gallery = await MongoDB.saveCollection({
      images,
      title: req.body.galleryName
    });

    if (gallery.status === "failed") {
      return res.status(500).jsonp({ error: gallery.error });
    }

    res.jsonp({ gallery });
  }
}

module.exports = GalleryController;
