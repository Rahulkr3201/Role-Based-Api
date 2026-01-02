const express = require("express");
const { register, login } = require("../controllers/authController");

const authrouter = express.Router(); //we name bwcause we want  to use this as authentication

authrouter.post("/register", register); //we could have written the logic here also using async await
authrouter.post("/login", login);

module.exports = authrouter;
