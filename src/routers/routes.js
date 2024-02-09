const express = require('express');
const router = express.Router();
const chatPrompt = require('./chat.prompt.routes');
const imagePrompt = require('./image.prompt.routes')

chatPrompt(router);
imagePrompt(router);

module.exports = router;