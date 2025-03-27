import admin from '../models/admin.js';
import User from '../models/user.js';
import jwt from "jsonwebtoken";

export const asignup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new admin({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.json("Signup succes");
  } catch (error) {
    next(error);
  }
};

export const asigngin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await admin.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "user Not found" });
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httponly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};








// User account deletion
export const adeleteUser = async (req, res, next) => {
  try {
    const auserId = req.params.userId; // Get userId from the URL parameter

    // Find and delete the user by their ID
    const deletedUser = await admin.findByIdAndDelete(auserId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    next(error);
  }
};



// Get all inventory items
export const getAlluser = async (req, res, next) => {
    try {
      const items = await User.find();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };


export const singOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};