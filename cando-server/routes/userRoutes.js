const express = require("express");
// import functions
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.route("/").get(getUsers).post(createUser);

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
