const User = require('../models/user')
const { verifyToken } = require("./verifyToken")
const router = require('express').Router()


router.delete('', verifyToken, async (req, res, next) => {
    try {
        User.deleteOne({ email: req.user.email })
        .then(() => {
            return res.status(200).json({
                message: `successfully deleted user with email: ${req.user.email}`
            })
        })
        .catch((error) => {
            next(error);
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "failed to delete user, reason: " + error
        })
    }

});

router.get('', verifyToken, async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.user.email })
        if (!user) {
            return res.status(404).json({
                message: `user with email: ${req.user.email} does not exist`
            })
        }

        let { password, verificationCode, ...others } = user._doc;

        return res.status(200).json({ ...others })
        
    } catch (err) {
        next(err)
    }
})

module.exports = router;