const express = require("express");
const router = express.Router();
const { validateUserProfile } = require("../validate");
const protect = require("../middleware/auth");

const {
  createProfile,
  updateProfile,
  getProfile,
  getAllProfiles,
} = require("../controllers/userProfile");

router.route("/add").post([protect, validateUserProfile], createProfile);

router.route("/update/:id").put(updateProfile);

router.get("/retrieve/:id", getProfile);

router.get("/retrieve", getAllProfiles);

module.exports = router;
