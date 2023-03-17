import User from "../models/User.js"


//getting single user 
export const getUser = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    };
};
//get friends of the user
export const getUserFriends = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const addRemoveFriend = async (req, res) => {
    try {

        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}