const multer = require('multer')

// use multer

const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;