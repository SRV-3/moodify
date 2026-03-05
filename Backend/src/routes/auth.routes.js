const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('/register',authController.userRegisterController)

router.post('/login',authController.userLoginController)

router.get('/get-me', authMiddleware.authUser, authController.getMe)

router.get('/logout', authController.logoutUser)

module.exports = router