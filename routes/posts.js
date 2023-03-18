import express from "express";
import { getFeedPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.get("/", verifyToken, getFeedPosts);

export default router;