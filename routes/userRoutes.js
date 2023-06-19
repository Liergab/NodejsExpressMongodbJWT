const express = require("express");
const userRoutes = express.Router();
 const {register, login , current, sample} = require("../controller/userController");
const validateToken = require("../middleware/validate.token.handler");


 userRoutes.post('/register', register);

 userRoutes.post('/login', login);

 userRoutes.get('/current', validateToken, current);

module.exports = userRoutes