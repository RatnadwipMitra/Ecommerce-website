const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

const loginMiddleware = (req,res,next)=>{
    try {
        jwt.verify(req.headers.token,process.env.secretKey)
        next()
        
    } catch (error) {
        res.status(403).json({"message":"token is expired"})
        
    }
   
}

module.exports = loginMiddleware;
console.log("auth is working");