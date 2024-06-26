import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';


const generateTokenAndSetCookie = (userId: Types.ObjectId, res: Response<any, Record<string, any>>) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
}


export default generateTokenAndSetCookie;