const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION
});

const limitFileSize = { fileSize: 1024 * 1024 * 5 }; // 1Byte -->1024Bytes or 1MB --> 5MB
const filterFileType = (req, file, cb) => {
  const isAllowedFileType =
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png";

  if (isAllowedFileType) {
    cb(null, true);
    return;
  }
  // To reject this file pass `false`
  cb(null, false);
};

const uploadImageToS3 = (fieldName) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_GALLERY_BUCKET,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: uuid(), contentType: file.mimetype });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      }
    }),
    limits: limitFileSize,
    fileFilter: filterFileType
  }).array(fieldName);

module.exports = { uploadImageToS3 };
