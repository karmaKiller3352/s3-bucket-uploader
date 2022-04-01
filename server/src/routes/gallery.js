const router = require("express").Router();
const { uploadImageToS3 } = require("../services/S3");
const GalleryController = require("../controllers/gallery");

router.post("/gallery", uploadImageToS3("photos"), GalleryController.post);

module.exports = router;
