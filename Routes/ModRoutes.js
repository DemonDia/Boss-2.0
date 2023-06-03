// ===========================express and router===========================
const express = require("express");
const router = express.Router();

// ===========================import controller===========================
const modController = require("../Controllers/ModController");

// ===========================all routes===========================
router.get("/name/t/:term/y/:year", modController.getModNamesTerm);
router.get("/code/t/:term/y/:year", modController.getModsCodesTerm);

// ===========================export routes===========================
module.exports = router;
