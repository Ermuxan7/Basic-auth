import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser, res);

    return res.status(201).json({
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user, res);

    return res.status(200).json({
      data: {
        id: user._id,
        email: user.email,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error login user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Erroo logout user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User fetched successfully",
    });
  } catch (error) {
    console.log("Error getting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
