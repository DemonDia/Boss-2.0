// ===========================express and router===========================
const express = require("express");
const router = express.Router();

// ===========================import controller===========================
const modController = require("../Controllers/ModController");

// ===========================all routes===========================
// get mod names for each term
router.get("/name/t/:term/y/:year", modController.getModNamesTerm);

// get mod codes for each term
router.get("/code/t/:term/y/:year", modController.getModsCodesTerm);

// get prof names for each term 
router.get("/prof/t/:term/y/:year", modController.getProfNamesTerm);

// get average median for each mod for given prof
router.get("/median/:round/:window/:code/:prof", modController.getAverageMedianMod);

// get average median for each mod based on prof
router.get("/median/mod/prof/:round/:window/:code", modController.getAverageMedianProfMod);

// ===========================export routes===========================
module.exports = router;
