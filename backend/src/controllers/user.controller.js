import User from '../models/user.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import Call from '../models/calls.model.js';
import mongoose from 'mongoose';
import Lawyer from '../models/lawyer.model.js';

import crypto from 'crypto';
import nodemailer from 'nodemailer';

const AccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered. Please login instead." });
    }
    const newUser = await User.create({
      name,
      email,
      location: { city, state },
      password
    });

     const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: 'Welcome to NyayaSetu',
      html: `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to <span style="color: #16A34A;">NyayaSetu</span>!</h2>
    <p>Dear ${newUser.name},</p>
    <p>Your NyayaSetu profile has been <strong>successfully created</strong>.</p>
    <p>You can now access legal support, government services, and more through our platform.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <br/>
    <p>Thank you for joining NyayaSetu.</p>
    <p>– The NyayaSetu Team</p>
  </div>
`
    };

    await transporter.sendMail(message);

    if (!newUser) return res.status(400).json({ error: "Error in saving user" });

    const user = await User.findById(newUser._id).select('-password');

    if (!user) return res.status(404).json({ error: "User not found after registration" });

    const { accessToken, refreshToken } = await AccessAndRefreshToken(user._id);

    return res.status(200)
      .cookie('refreshToken', refreshToken)
      .cookie('accessToken', accessToken)
      .json({ user });

  } catch (error) {
    return res.status(401).json({ error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const check = await user.comparePassword(password);
    if (!check) return res.status(400).json({ msg: "Invalid Credentials" });

    const users = await User.findOne({ email }).select('-password -refreshToken');

    const { accessToken, refreshToken } = await AccessAndRefreshToken(user._id);
    console.log(accessToken);
    
    return res.status(200)
      .cookie('refreshToken', refreshToken)
      .cookie('accessToken', accessToken)
      .json({ users , accessToken});

  } catch (error) {
    return res.status(401).json({ error });
  }
};

const updateProfileImages = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.files?.profilePhoto?.[0]) {
      const uploadedProfile = await uploadToCloudinary(req.files.profilePhoto[0].path);
      if (!uploadedProfile) return res.status(500).json({ error: "Profile photo upload failed" });
      user.profilePhoto = uploadedProfile.secure_url;
    }

    if (req.files?.idProof?.[0]) {
      const uploadedProof = await uploadToCloudinary(req.files.idProof[0].path);
      if (!uploadedProof) return res.status(500).json({ error: "ID Proof upload failed" });
      user.idProof = uploadedProof.secure_url;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Profile photo and ID proof updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const getCallHistory = async (req, res) => {
  try {
    const id = req.userId;

    const callsHistory = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'calls',
          localField: '_id',
          foreignField: 'userID',
          as: 'allCalls'
        }
      },
      {
        $addFields: {
          totalCalls: {
            $size: '$allCalls'
          }
        }
      },
      {
        $unwind: {
          path: '$allCalls'
        }
      },
      {
        $project: {
          allCalls: 1,
          totalCalls: 1
        }
      }
    ]);

    return res.status(200).json({ callsHistory });

  } catch (error) {
    return res.status(405).json({ error });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:3000/user/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>Link valid for 15 minutes</p>
      `,
    };

    await transporter.sendMail(message);

    return res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Token expired or invalid' });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error resetting password', error });
  }
};


export {
  registerUser,
  loginUser,
  getCallHistory,
  updateProfileImages,
  forgetPassword,
  resetPassword
};
