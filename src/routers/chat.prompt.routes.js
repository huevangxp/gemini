const controller = require('../controllers/chat.prompt.controller');

module.exports = (router) => {
    router.post('/chat-prompt', controller.chatPrompt);
}