const express = require('express');
const captainController = require('../controllers/captain.controller')
const router = express.Router();
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 characters"),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 character'),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate must be at least 3 characters"),
    body('vehicle.capacity').isInt({min:1}).withMessage("capacity must be less then 1"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid'),
],
    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character')
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports = router;