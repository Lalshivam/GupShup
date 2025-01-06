import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypts from 'bcryptjs';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }    

        if(password.length < 6){
            return res.status(400).send('Password must be at least 6 characters');
        }

        const user = await User.findOne({ email });
        
        if(user){
            return res.status(400).json({message:'User already exists'});
        }

        const salt = await bcrypts.genSalt(10);
        const hashedPassword = await bcrypts.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        if(newUser){
            //generate token
            generateToken(newUser._id, res);
            await newUser.save();
            
            res.status(201).json(
                {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    profilePic: newUser.profilePic,
                }
            );
        }else{
            return res.status(400).json({message:'Invalid user data'});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message); 
        res.status(500).json({message:'Internal Server Error'});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;   
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const isPasswordCorrect = await bcrypts.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:'Invalid credentials'});
        }

        generateToken(user._id, res);

        res.status(200).json(
            {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePic: user.profilePic,
            }
        );
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message:'Internal Server Error'});        
    }
};


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { httpOnly: true, secure: true, expires: new Date(0) });
        res.status(200).json({message:'Logged out successfully'});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message:'Internal Server Error'});        
    }
};

export const updateProfile = async (req,res) => {
    try {

        const {profilePic} = req.body;
        const userId = req.user ? req.user.id : null;

        if (!userId) {
            return res.status(400).json({message:'User not authenticated'});
        }

        if(!profilePic){
            return res.status(400).json({message:'Profile pic is required'});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,
            {profilePic: uploadResponse.secure_url},
            {new: true}
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
};