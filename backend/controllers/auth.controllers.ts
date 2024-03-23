import User from "../models/User.models";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken";


export const signup = async (req, res) =>{
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


        const user = await User.findOne({username: { $regex: new RegExp(username, 'i')}});

        if (user){
            return res.status(400).json({message: 'User already exist'})
        }
        
        //HASH password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
    
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
            })

        }else{
            return res.status(400).json({message: 'Invalid credentials'})
        }

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
};


export const login = async (req, res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!username || !password){
            return res.status(400).json({message: 'All fields are required'})
        }
      
        if (!user || !isPasswordCorrect){
            return res.status(400).json({message: 'Invalid username or password'})
        }

        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
        })
        
    }catch (err){
        console.error(`Error in the login controller: ${err.message}`);
        res.status(500).send('Server Error')
    }
}


export const logout = async (req, res) =>{
    try{
        res.cookie('jwt', '', {maxAge: 0});
        return res.status(200).json({message: 'Logout successful'})
    }
    catch (err){
        console.error(`error in the logout controller: ${err.message}`);
        res.status(500).send('Server Error')
    }
}