const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const userrouter = express.Router();

//only admin can acces the route no manager and user can acess thi route
userrouter.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "welcome admin" });
});

//both admin and mananager can access this router and the authorize middleware checks if the roles are admin and manager then onlt allow this route
userrouter.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "welcome manager" });
  }
);

//all can access this even it it manager,user,admin.
userrouter.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "welcome user" });
  }
);

module.exports = userrouter;
