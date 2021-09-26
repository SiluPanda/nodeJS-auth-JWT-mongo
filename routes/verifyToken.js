const JWT = require('jsonwebtoken')

let verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization
    if (authToken) {
        JWT.verify(authToken.split(" ")[1], process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(401).json({
                    message: `authToken is either not valid or expired`
                })
            }
            else {
                req.user = user;
                next()
            }
        })
        
    }
    else {
        return res.status(401).json({
            message: "authentication token not found"
        })
    }
}

module.exports = { verifyToken }