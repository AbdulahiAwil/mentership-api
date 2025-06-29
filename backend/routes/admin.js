import express from 'express'
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
// import { login, register } from '../controllers/auth.js';

const router = express.Router();


router.get('/dashboard',protect,authorize('admin'), (req, res) => {
  res.json({message: `Welcome to Admin Dashboard, ${req.user.name}`})
})


export default router