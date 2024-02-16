const path = require("path");
const fs = require("fs");
const multer = require("multer");

const createDestinationDir = (dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folName;
    const uploadDir = path.join("public", folder);

    createDestinationDir(uploadDir);
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    return cb({ code: "LIMIT_FILE_TYPE" });
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
