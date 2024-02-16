const express = require('express')
const userController = require('../Controllers/userController')
const authController = require('../Controllers/authController')

const route = express.Router()

route.route('/signup').post(authController.signup)
route.route('/login').post(authController.login)

route.route('/').get(userController.getUser)

route.use(authController.protect)
route.route('/updateMe').get(userController.updateMe)
route.route('/getMe').get(userController.getMe)

module.exports = route