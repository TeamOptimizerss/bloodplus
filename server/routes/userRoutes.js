const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/getdonorcounts", userController.getDonorCounts);

module.exports = router;
