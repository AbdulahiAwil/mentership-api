
import User from "../models/User.js";
import { generateToken } from "../utility/generateToken.js";



export const register = async (req, res, next) => {
    let {name, password, email, role} = req.body;

    try {

        // Email inuu jiro ayaad iska fiirinaysaa
        email = email.toLowerCase();
        const exists = await User.findOne({ email })

        if(exists) return res.status(400).json({message: "Email already in use"});

        const user = await User.create({name, password, email, role})

        const token = generateToken(user._id)
        // res.status(201).json({ token, user })
         res.status(201).json({ "success": true, message: "User registered successfully" })
        
        
    } catch (err) {

        console.log("error", err)
        next(err);
    }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
        console.log("User info", user)
    const token = generateToken(user._id);
    res.json({ token, user});
  } catch (err) {
    next(err);
  }
};
