import express from 'express'
import { getPosts, getPostsInfo } from'../controllers/posts.js'
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostsInfo)


// Export router
export default router


