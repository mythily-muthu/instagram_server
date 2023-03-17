import express from "express";
import { getUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


let router = express.Router();
router.get("/:id", verifyToken, getUser);//get single user


export default router;