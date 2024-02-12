const controller = require('../controllers/user.controller')

module.exports = (router) => {
    router.post('/register', controller.Register);
    router.post('/login', controller.Login);
}