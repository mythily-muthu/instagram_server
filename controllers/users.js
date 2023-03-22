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
        let user = await User.findById(id);  //get user details from db
        let friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            //remove friend
            user.friends = user.friends.filter((frd_id) => frd_id !== friendId); //returns modified array
            friend.friends = friend.friends.filter((frd_id) => frd_id !== id);
        } else {
            //add friend 
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}