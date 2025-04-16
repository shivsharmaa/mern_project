const jwt = require('jsonwebtoken');
require('dotenv').config();
const {expressjwt : expressJwt} = require('express-jwt');

const SignIn = require("../Modals/SignIn");

exports.verifyToken  = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["token"];

    const user = await SignIn.findOne({token : token});
    
    if(user){
        if(!token){
            return res.status(403).send("A token is required for authentication");
        }

        try{
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        }catch(error){
            return res.status(644).send("Invalid token or expired");
        }
    }else {
        return res.status(644).send("Session timeout");
      }

      return next();
};

exports.isSignIn = expressJwt({
    secret : process.env.JWT_SECRET,
    algorithms : ["HS256"],
    userProperty : "auth"
})

