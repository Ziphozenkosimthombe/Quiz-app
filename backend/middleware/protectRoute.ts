import jwt from 'jsonwebtoken';
import {protectRouteUser} from '../models/User.models';
import express from 'express'


interface CustomRequest extends express.Request {
    user?: any; // Define the user property here
}

export const protectRoute =  async (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
    try{
        const token = req.cookies.jwt;
        
        if(!token){
            console.log(token);
            return res.status(401).json({message: "Unauthorized - No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }
        const user: any = await protectRouteUser(decoded.userId);

        if (!user){
             return res.status(401).json({message: "Unauthorized - No user found"});
        }
        req.user = user;

        next();
    } catch (error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

