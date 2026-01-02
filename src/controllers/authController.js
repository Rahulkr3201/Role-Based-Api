const User = require("../models/userModel"); // exporting userschema to use
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER CONTROLLER
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    // hashing password before storing in database
    const hashedPassword = await bcrypt.hash(password, 10);

    // making new user to push in user schema
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "user registered" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
}; // this can also be done directly in route but we made it separate

// LOGIN CONTROLLER
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // checking whether user exists or not
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "username not found" });
    }

    // comparing plain password with hashed password from DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // if the user gets verified then we generate token
    // we are using id and role to generae the token .
    //  means we can also take these roles and id from the token by decoding it . it is stored in req.user as we send it wilt every request (not req.body);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    ); // jwt_secret acts as a sign that i have created this token not any outsider

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  register,
  login,
};
