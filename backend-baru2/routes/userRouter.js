const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { auth, checkRole } = require("../middlewares/auth");

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.get("/me", auth, UserController.getCurrentUser);

router.post(
  "/admin",
  auth,
  checkRole("superadmin"),
  UserController.createAdmin
);

module.exports = router;
