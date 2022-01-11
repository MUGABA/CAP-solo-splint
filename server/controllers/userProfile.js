const asyncHandler = require("express-async-handler");
const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
const mongoose = require("mongoose");
const _ = require("lodash");

// handling this on assumption user is logged in
exports.createProfile = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    contact,
    address,
    description,
  } = req.body;

  const currentUserId = mongoose.Types.ObjectId(req.user.id);

  const findByEmail = await UserProfile.findOne({
    email: profileDetails.email,
  });

  if (findByEmail) {
    res.status(400);
    throw new Error("Email already taken");
  }

  const userStillExists = await User.findById(currentUserId);
  if (!userStillExists) {
    res.status(404);
    throw new Error("Account does not exists");
  }

  const userProfile = await UserProfile.create({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    contact,
    address,
    description,
    userId: currentUserId,
  });

  if (userProfile) {
    res.status(201).json({
      status: 201,
      success: _.omit(userProfile.toObject(), ["__v"]),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    contact,
    address,
    description,
  } = req.body;

  let userId;
  try {
    userId = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    throw new Error("Invalid id");
  }

  const findByEmail = await UserProfile.findOne({ email });
  if (findByEmail && findByEmail._id !== userId) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const userProfile = await UserProfile.findById(userId);

  if (userProfile) {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        email,
        contact,
        address,
        description,
      },
      { new: true }
    ).select(["-__v"]);

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } else {
    res.status(404);
    throw new Error("User with that id no longer exists");
  }
});

exports.getProfile = asyncHandler(async (req, res, next) => {
  let userId;
  try {
    userId = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    throw new Error("Invalid id");
  }

  const userProfile = await UserProfile.findById(userId).select(["-__v"]);

  if (userProfile) {
    res.status(200).json({
      status: 200,
      message: "Profile retrieved successfully",
      data: userProfile,
    });
  } else {
    res.status(404);
    throw new Error("User with that id no longer exists");
  }
});

exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const userProfilles = await UserProfile.find().select(["-_id", "-__v"]);

  if (userProfilles) {
    res.status(200).json({
      status: 200,
      message: "Profiles retrieved successfully",
      data: userProfilles,
    });
  } else {
    res.status(404);
    throw new Error("User with that id no longer exists");
  }
});
