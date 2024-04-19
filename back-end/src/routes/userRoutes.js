const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/user/login", userController.loginUser);
router.post("/user/signup", userController.registerUser);
router.post("/user/auth/google", userController.google);

router.get("/user", userController.getUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
