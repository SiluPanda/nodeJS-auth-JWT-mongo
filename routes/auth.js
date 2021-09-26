const router = require('express').Router();
const User = require('../models/user');
const { sendEmail } = require('../utils/mailer')
const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')
const { verifyToken } = require('./verifyToken')

require('dotenv').config()


router.post('/register', async (req, res, next) => {

    try {

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_ENCRYPTION_KEY).toString(),
            emailVerficationStatus: "pending",
            influencerStatus: "pending", 
            verificationCode: Math.floor(Math.random() * 1000000 + 10000)
        });

        let userIfExistsByUserName = await User.findOne({ username: req.body.username })
        if (userIfExistsByUserName) {
            return res.status(409).json({
                message: `username ${req.body.username} is already taken`
            })
        }

        let userIfExistsByEmail = await User.findOne({ email: req.body.email })
        if (userIfExistsByEmail) {
            return res.status(409).json({
                message: `email ${req.body.email} is already taken`
            })
        }

        let savedUser = await newUser.save();
        
        sendEmail(req.body.email, 
                "[FanFav] Email Verfication Code", 
                `Your verfication code is ${savedUser.verificationCode}`)
        .then(() => console.log(`successfully sent validation code to ${req.body.email}`))
        .catch((error) => {
            console.log(`error while sending verification code to email ${req.body.email}, reason: ${reason}`);
        })

        return res.status(201).json({
            message: "user registered successfully"
        });
    } catch (error) {
        await User.deleteOne({ username:req.body.username })
        next(error);
    }
    
})


router.post('/verify', async (req, res, next) => {

    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                message: `user with email: ${req.body.email} does not exist`
            })
        }
        
        if (user.verificationCode !== req.body.verificationCode) {
            return res.status(400).json({
                message: `invalid code provided for user with email: ${req.body.email}`
            })
        }
            
        User.findOneAndUpdate({ email: req.body.email }, { emailVerficationStatus: "verified" })
        then(() => {
            return res.status(200).json({
                message: `email ${req.body.email} verified successfully`
            })
        })
        .catch((error) => {
            next(error)
        })

        
    } catch (err) {
        next(err);
    }

})


router.post("/login", async (req, res, next) => {

    try {
        let user = await User.findOne({ email: req.body.email });

        
        if (user == null || !user) {
            res.status(404).json({
                message: `user with email ${req.body.email} does not exist`
            })
        }

        let password = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_ENCRYPTION_KEY)
                                    .toString(CryptoJS.enc.Utf8);


        if (password !== req.body.password) {
            return res.status(401).json({
                message: "password is incorrect"
            })
        }

        if (!user.emailVerficationStatus || user.emailVerficationStatus === 'pending') {
            return res.status(400).json({
                message: `email ${req.body.email} is not verified`
            })
        }


        let authToken = JWT.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email
            },
            
            process.env.JWT_SEC,
            {
                expiresIn: "7d"
            })

        return res.status(200).json({
            authToken: authToken
        })
    } catch (err) {
        next(err);
    }
            
})


router.post('/changeusername', verifyToken, async (req, res, next) => {

    try {
        let newUserName = req.body.newUserName;
        if (!newUserName) {
            return res.status(400).json({
                message: `please provide a valid username`
            })
        }

        let userIfExists = await User.findOne({ username: newUserName });
        if (userIfExists) {
            return res.status(409).json({
                message: `username ${newUserName} is already taken`
            })
        }
        
        User.findOneAndUpdate({ email: req.user.email }, { username: newUserName })
        .then(() => {
            return res.status(200).json({
                message: `username updated successfully`
            })
        })
        .catch(err => {
            next(error)
        });
        

    } catch (error) {
        next(error);
    }

});

router.post('/resetpassword', verifyToken, async (req, res, next) => {
    try {
        if (req.body.newPassword !== req.body.newPasswordAgain) {
            return res.status(400).json({
                message: "both passwords do not match"
            })
        }
        
        let encryptedNewPassword = CryptoJS.AES.encrypt(req.body.newPassword, process.env.PASSWORD_ENCRYPTION_KEY).toString()
        User.findOneAndUpdate({ email: req.user.email }, { password: encryptedNewPassword })
        .then(() => res.send({
            message: `successfully updated password`
        }))
        .catch((error) => next(error));
        
    } catch (error) {
        next(error)
    }
})


module.exports = router
