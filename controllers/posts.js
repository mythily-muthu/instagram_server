import Post from "../models/Post.js";
import User from "../models/User.js";



//create
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        //user
        const user = await User.findById(userId);
        //post
        const newPost = new Post(
            {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
                comments: []
            }
        );
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
//get all posts (read)
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
};

//get user posts
export const getUserPosts = async (req, res) => {
    try {
        // const { userId } = req.params;
        const user_id = req.params.id;
        console.log('userId', req.params)
        const posts = await Post.find({ userId: user_id }).sort({ createdAt: -1 });
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
//(update)
export const likePost = async (req, res) => {
    try {
        //post id
        const { id } = req.params;
        //userid
        const { userId } = req.body;
        const post = await Post.findById(id); //finding post with id
        const isLiked = await post.likes.get(userId);//whether liked or not
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        };
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const deletePost = async (req, res) => {
    try {
        const post_id = req.params.id
        await Post.findByIdAndDelete(post_id);
        res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
