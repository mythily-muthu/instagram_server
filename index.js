import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";






//configurations..
const __filename = fileURLToPath(import.meta.url) //the url of the current module is converted to a file path
const __dirname = path.dirname(__filename);//represents the directory path of the module file
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());//a middleware used for security of backend in web apps
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));//used to restrict cross origin request
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//Routes - FILES
app.post("/auth/register", upload.single('picture'), register);
app.post("/posts", verifyToken, upload.single('picture'), createPost);

//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes)



//mongoose setup
const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log("server runs successfully"));
    // add data one time
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((error) => console.log(`${error} server did not connect`));