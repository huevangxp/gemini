const controller = require('../controllers/image.prompt.controller');
const upload = require('../controllers/upload')

module.exports = (router) => {
    router.post('/image-prompt',upload.single('myfile'), controller.imagePrompt);
}