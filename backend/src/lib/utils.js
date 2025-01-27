import jwt from 'jsonwebtoken';

export const generateToken = (userId,res) => {
    const  token = jwt.sign({userId : userId._id}, process.env.JWT_SECRET, 
        {
            expiresIn: '7d'
        });

        res.cookie('jwt', token, {
            httpOnly: true,  // to prevent XSS attacks
            sameSites: 'strict', // to prevent CSRF attacks 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure : process.env.NODE_ENV !== "development" ? true : false
        }); 

        return token;
}