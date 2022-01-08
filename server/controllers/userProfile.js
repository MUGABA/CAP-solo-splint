const asyncHandler = require("express-async-handler");
const UserProfile = require("../models/UserProfile");
const User = require("../models/User");
const mongoose = require("mongoose");
const _ = require("lodash");

// handling this on assumption user is logged in
exports.createProfile = asyncHandler(async (req, res, next) => {
  const profileDetails = _.pick(req.body, [
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "email",
    "contact",
    "address",
    "description",
  ]);

  const currentUserId = mongoose.Types.ObjectId(req.user.id);

  const findByEmail = await UserProfile.findOne({
    email: profileDetails.email,
  });

  if (findByEmail) {
    res.status(400);
    throw new Error("Email already in taken");
  }

  const userStillExists = await User.findById(currentUserId).exec();
  if (!userStillExists) {
    res.status(404);
    throw new Error("Your account has been deactivated, Please contact admin");
  }

  const userProfile = await UserProfile.create({
    ...profileDetails,
    userId: currentUserId,
  });

  if (userProfile) {
    res.status(201).json({
      status: 201,
      success: _.omit(userProfile.toObject(), ["_id", "_v"]),
    });
  } else {
    res.status(400);
    throw new Error("Check your details");
  }
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const profileDetails = _.pick(req.body, [
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "email",
    "contact",
    "address",
    "description",
  ]);

  let userId;
  try {
    userId = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    throw new Error("Invalid id");
  }

  const findByEmail = await UserProfile.findOne({
    email: profileDetails.email,
  });
  if (findByEmail && findByEmail._id !== userId) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const userProfile = await UserProfile.findById(userId).exec();

  if (userProfile) {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      userId,
      {
        ...profileDetails,
      },
      { new: true }
    ).exec();

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: _.omit(updatedProfile.toObject(), ["_id", "__v"]),
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

  const userProfile = await UserProfile.findById(userId);

  if (userProfile) {
    res.status(200).json({
      status: 200,
      message: "Profile retrieved successfully",
      data: _.omit(userProfile.toObject(), ["_id", "__v"]),
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
