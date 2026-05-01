import Resume from "../models/Resume.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "../configs/firebaseAdmin.js";


const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}

// controller for user Registration 
//post: /api/users/register


export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body; 

        //check if required fields are present
        if(!name || !email || !password){
            return res.status(400).json({message: "Missing required fields"});
        }

        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        //create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        //return success message 
        const token = generateToken(newUser._id);
        newUser.password = undefined; // Exclude password from response
        res.status(201).json({message: "User registered successfully", token, user: newUser});
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
}


// controller for user login 
//post: /api/users/login

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body; 

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "invalid email or password"});
        }

        //check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }
       
        //retrun success message 
        const token = generateToken(user._id);
        user.password = undefined; // Exclude password from response
        res.status(200).json({message: "User logged in successfully", token, user});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

// controller for getting user by id 
//Get: /api/users/data

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId; // Assuming you have middleware to set req.userId

        //check if user exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        //retrun success message
        user.password = undefined; // Exclude password from response
        res.status(200).json({message: "User data retrieved successfully", user});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

// controller for getting user resumes
//Get: /api/users/resumes

export const getUserResumes = async (req, res) => {
    try{
        const userId = req.userId; // Assuming you have middleware to set req.userId
        //rerturn user resumes
        const resumes = await Resume.find({user: userId});
        res.status(200).json({message: "User resumes retrieved successfully", resumes});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

// firebase login controller
export const firebaseLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email;
    const name = decoded.name;

    // Check if user exists in MongoDB
    let user = await User.findOne({ email });
    
    // If user doesn't exist, create one
    if (!user) {
      user = new User({
        name,
        email,
        password: "firebase-" + decoded.uid // Dummy password for Firebase users
      });
      await user.save();
    }

    // Generate JWT token using the same pattern as loginUser
    const myToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: myToken,
      user: { 
        email, 
        name,
        _id: user._id
      }
    });

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};