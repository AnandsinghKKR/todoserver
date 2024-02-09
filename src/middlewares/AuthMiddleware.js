import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"
import Jwt from 'jsonwebtoken';


const AuthMiddleware=(req,res,next)=>{
    if(req.headers["auth"]==undefined){
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR,"ACCESS DENIED "));
    }

    const token=req.headers['auth'];
    // verification of Token 
    try {
        const decodeed=Jwt.verify(token,JWT_TOKEN_SECRET)
        console.log(decodeed)
        req.userId=decodeed.userId;
        return next();
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"INVALID TOKEN"));
    }
}

export  default AuthMiddleware;