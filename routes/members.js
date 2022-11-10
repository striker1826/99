const express = require("express");
const router = express.Router();

const MembersController = require("../controller/members.controller");
const membersController = new MembersController();

router.post("/signup", membersController.createMembers);
router.post("/login", membersController.loginMembers);

module.exports = router;
