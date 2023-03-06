const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
// get all users
router.get("/all", async (req, res) => {
  try {
    let users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

//update user
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const exists = await User.findById(userId);
    if (exists) {
      let user = await User.findByIdAndUpdate(userId, {
        $set: req.body,
      });

      return res.status(200).json({ message: "success", data: user });
    } else throw "Unauthorized";
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    let deletedUser = req.params.id;
    await User.findByIdAndDelete(deletedUser);
    let users = await User.find({});
    users.forEach((user) => {
      Promise.all(
        user.followings.forEach(async (friendId) => {
          await User.findByIdAndUpdate(friendId, {
            $pull: { followings: deletedUser },
          });
        })
      );
    });
    await Post.deleteMany({ userId: deletedUser });
    res.status(200).json({ message: "Account has been deleted", data: null });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a user
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
    console.log("req made for a user!");
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    if (!user)
      return res.status(200).json({
        message: "User not found!",
        data: null,
      });
    const { password, updatedAt, __v, ...other } = user._doc;
    return res.status(200).json({
      message: "success",
      user: other,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// fetch all friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      const friends = await Promise.all(
        user.followings.map(async (friendId) => {
          let friend = await User.findById(friendId);
          return {
            _id: friend._id,
            profilePicture: friend.profilePicture,
            username: friend.username,
          };
        })
      );
      return res.status(200).json(friends);
    } else throw Error("User not found!");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
