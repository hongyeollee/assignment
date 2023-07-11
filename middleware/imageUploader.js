const multer = require('multer');
const { appDataSource } = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ' ~/Desktop/thn test api docs');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = { upload };
