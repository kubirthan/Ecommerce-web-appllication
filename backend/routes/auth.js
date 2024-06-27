const express = require('express')
const {authorizeroles} = require('../middlewares/authenticate')

const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
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

//Admin routes
router.route('/admin/users').get(isAutneticatedUser,authorizeroles('admin'), getAllUsers)
router.route('/admin/user/:id').get(isAutneticatedUser,authorizeroles('admin'), getUser)
                                .put(isAutneticatedUser,authorizeroles('admin'), updateUser)
                                .delete(isAutneticatedUser,authorizeroles('admin'), deleteUser)


module.exports = router