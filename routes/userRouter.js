const express = require("express");

const userRouter = express.Router();

const signupController = require("../controllers/SignupController.js");
const FileUploadController = require("../controllers/FileUploadController");

userRouter.post(
  "/signUp",
  FileUploadController.upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "coverPhotos", maxCount: 5 },
  ]),
  signupController.signUpCon
);

module.exports = userRouter;
