const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// forgot password
router.post("/forgotPassword", async(req, res) => {
  try {
    let user = await User.findOne({email: req.body.email});
    if(!user) throw ("not found"); 
    else{
      let password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      await User.findByIdAndUpdate(user._id, {
        $set : req.body,
      });
      return res.status(200).json({message: "success"});
    }
  } catch (error) {
    if(error === "not found") return res.status(200).json({"message": error});
    else return res.status(200).json(error);
  }
});

//REGISTER
router.post("/register", async (req, res) => {
  try {
    // find if user already exists
    let ifUser = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (!ifUser) {
      // generate hashed password!
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      //save user and respond
      const user = await newUser.save();
      return res.status(200).json({ user: user });
    } else {
      return res.status(200).json({ exists: true });
    }
  } catch (err) {
    res.status(200).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user)
      return res.status(200).json({ message: "not found", data: null });
    else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res
          .status(400)
          .json({ message: "Invalid Password!", data: null });
      else return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
