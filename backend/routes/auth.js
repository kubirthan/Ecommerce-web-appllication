const express = require('express')
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile
     } = require('../controllers/authController')
const router = express.Router()
const {isAutneticatedUser} = require('../middlewares/authenticate')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(isAutneticatedUser, changePassword)
router.route('/myprofile').get(isAutneticatedUser, getUserProfile)
router.route('/update').put(isAutneticatedUser, updateProfile)


module.exports = router