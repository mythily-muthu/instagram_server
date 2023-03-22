import express from "express";
import { deletePost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:id", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
//delete post
router.delete("/:id", verifyToken, deletePost);
export default router;