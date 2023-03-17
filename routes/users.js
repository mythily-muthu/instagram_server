import express from "express";
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


let router = express.Router();
router.get("/:id", verifyToken, getUser);//get single user
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;