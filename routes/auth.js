import express from 'express'
import { login, register } from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateZod.js';
import { createUserSchema } from '../schemas/userSchema.js';
const router = express.Router();

router.post('/register',validate(createUserSchema), register)
router.post('/login', login)

// Protected Routes

router.get('/profile', protect, (req, res) =>{
    console.log("req.user", req.user)
    res.json(req.user)
})



export default router