import express from 'express'
import { login, register } from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateZod.js';
import { createUserSchema } from '../schemas/userSchema.js';
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */


router.post('/register',validate(createUserSchema), register)
router.post('/login', login)

// Protected Routes

router.get('/me', protect, async (req, res) => {
    console.log("req.user", req.user)
    // await new Promise(resolve => setTimeout(resolve, 5000))
    res.json(req.user)
})


export default router