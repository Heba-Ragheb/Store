import jwt from "jsonwebtoken"

export const authJwt = (req,res)=>{
    const token = req.cookies.token
    jwt.verify(token,
        process.env.JWT_SECRET,
        (error,decodedToken)=>{
            if(error){
                	return res.status(401).json({ message: "Invalid token" });
            }
            req.user = decodedToken
            next()
        })
    
}