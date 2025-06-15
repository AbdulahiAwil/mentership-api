
import User from '../models/User.js'
import { generateToken } from '../utility/generateToken.js'

export const getUsers = async (req, res) => {
    const users = await User.find()

    res.json(users)
}

export const getUserInfo = async (req, res) => {

    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("User not Found");
     res.json(user)

}

export const createUser = async (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    // Database markad ku save garaynaysid
    const saved = await user.save();

    res.status(201).json(saved)

}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {

        const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true})

        if(!updateUser){
            return res.status(404).send('User Not Found')
        }
        res.json(updateUser)
        
    } catch (error) {
        req.status(500).send('Server error')
    }
}

export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
          res.status(404).send("ID NOT FOUND");
          
        }
        res.send(`User with ${id} deleted`);
        
    } catch (error) {
        req.status(500).send('Server error')
    }
    
}

