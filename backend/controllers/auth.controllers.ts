import {createUser, getUserByUsername} from "../models/User.models";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken";
import express from 'express';


export class SignupAuthController{
    static async signup(req: express.Request, res: express.Response){
        try {
            const {fullName, username, password, confirmPassword} = req.body;
            if(!fullName || !username || !password || !confirmPassword){
                return res.status(400).json({message: 'All fields are required'})
            }
    
            if (password.length < 8){
                return res.status(400).json({message: 'Password must be at least 8 characters'})
            }
    
            if (password !== confirmPassword){
                return res.status(400).json({message: 'Password do not match'})
            }
    
    
            const user = await getUserByUsername(username);
    
            if (user){
                return res.status(400).json({message: 'User already exist'})
            }
            
            //HASH password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            const newUser = await createUser({
                fullName,
                username,
                password: hashedPassword,
                confirmPassword: hashedPassword
            });
    
            if(newUser){
                generateTokenAndSetCookie(newUser._id, res);
    
                res.status(302).redirect('/api/auth/signup')
    
            }else{
                return res.status(400).json({message: 'Invalid credentials'})
            }
    
        }catch (err){
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    
    }
}




export class LoginAuthController{
    static async login(req: express.Request, res: express.Response){
        try{
            const {username, password} = req.body;
            const user = await getUserByUsername(username);
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

            if (!username || !password){
                return res.status(400).json({message: 'All fields are required'})
            }
          
            if (!user || !isPasswordCorrect){
                return res.status(400).json({message: 'Invalid username or password'})
            }

            generateTokenAndSetCookie(user._id, res);
            res.status(302).redirect('/api/quiz/all')
            
            
            
        }catch (err){
            console.error(`Error in the login controller: ${err.message}`);
            res.status(500).send('Server Error')
        }
    }
}



export class LogoutAuthController{
    static async logout(req: express.Request, res: express.Response){
        try{
            res.cookie('jwt', '', {maxAge: 0});
            return res.status(302).redirect('/')
        }
        catch (err){
            console.error(`error in the logout controller: ${err.message}`);
            res.status(500).send('Server Error')
        }
    
    }
}

export class GetAuthLogin {
    static getLogin(req: express.Request, res: express.Response) {
        res.render('login');
    }
}

export class GetAuthSignup {
    static getSignup(req: express.Request, res: express.Response) {
        res.render('signup');
    }
}