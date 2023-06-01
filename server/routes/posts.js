import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getFeedPosts, getUserPosts, likePosts} from '../controllers/posts.js'

const router = express.Router()

//READ
router.get('/', verifyToken, getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

// UPDATE
router.patch('/:id/like', verifyToken, likePosts)

export default router