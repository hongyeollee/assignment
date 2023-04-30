const multer = require('multer');
const { appDataSource } = require('../models');

const dest = async (imageUrl) => {};
const upload = multer(dest());

module.exports = { upload };
