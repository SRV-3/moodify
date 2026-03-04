const {Router} = require('express')
const authController = require('../controllers/auth.controller')

const router = Router()

router.post('/register',authController.userRegisterController)

router.post('/login',authController.userLoginController)

module.exports = router