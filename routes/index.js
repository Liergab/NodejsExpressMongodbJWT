const express = require("express");
const router = express.Router();
const{
    createSample,
    getSample,
    deleteSample,
    getSampleById,
    updateSample} = require("../controller/sample");
const validateToken = require("../middleware/validate.token.handler");
// const asyncHandler = require("express-async-handler");

router.get("/", validateToken, getSample)

router.get("/:id", validateToken, getSampleById)

router.put("/:id", validateToken, updateSample)

router.post("/", validateToken, createSample);

router.delete("/:id", validateToken, deleteSample)

module.exports = router