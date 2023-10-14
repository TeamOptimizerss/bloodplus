const User = require("../models/user");

exports.signUp = async (req, res) => {
  try {
    const userData = req.body;
    const requiredFields = [
      "username",
      "mailid",
      "password",
      "terms",
      "bloodgroup",
      "contact",
      "longitude",
      "latitude",
    ];

    // Check if all required fields are present
    const missingFields = requiredFields.filter((field) => !userData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ mailid: userData.mailid });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { mailid, password } = req.body;
    const user = await User.findOne({ mailid });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(402).json({ message: "Invalid password" });
    }
    res.status(200).json({
      message: "Login successful",
      userEmail: user.mailid,
      username: user.username,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
