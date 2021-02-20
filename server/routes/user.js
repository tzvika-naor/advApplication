const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/:id", UserController.getUser);
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.get("", UserController.getUsers);
router.put("/update", UserController.updateUser);
router.put("/updateByUserId", UserController.updateByUserId);
router.delete("/deleteUser", UserController.deleteUser);
router.delete("/deleteUserByAdmin/:id", UserController.deleteUserByAdmin);
module.exports = router;