import User from "../models/User.js"


//getting single user 
export const getUser = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findById(id);
        user.password = undefined;
        res.status(200).send(user);
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
        let { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        console.log('user', user)
        //to remove friend
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) !== friendId);
            friend.friends = friend.friends.filter((id) !== id);
        } else {
            user.friends.push(friendId); // to add friend
            friend.friends.push(id);
        };
        await user.save();
        await friend.save();

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
