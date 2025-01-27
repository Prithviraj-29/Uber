const express = require('express');
const captainController = require('../controllers/captain.controller')
const router = express.Router();
const {body} = require("express-validator")


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 characters"),
    body('vechicle.color').isLength({min:3}).withMessage('color must be at least 3 character'),
    body('vechicle.plate').isLength({min:3}).withMessage("Plate must be at least 3 characters"),
    body('vechicle.capacity').isInt({min:1}).withMessage("capacity must be less then 5"),
    body('vechicle.vechicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid'),
],
    captainController.registerCaptain
)


module.exports = router;