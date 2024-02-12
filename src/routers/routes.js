const express = require('express');
const router = express.Router();
const chatPrompt = require('./chat.prompt.routes');
const imagePrompt = require('./image.prompt.routes')
const User = require('./user.routes')

chatPrompt(router);
imagePrompt(router);
User(router);

module.exports = router;