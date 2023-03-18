import express from "express";
import { getFeedPosts } from "../controllers/posts";
import { verifyToken } from "../middleware/auth";


const router = express.Router();

router.put("/", verifyToken, getFeedPosts);
