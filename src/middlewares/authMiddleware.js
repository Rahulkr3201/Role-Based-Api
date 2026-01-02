const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  // the token will be generated and passed by header whenever the request is made
  // we can also use this from cookie

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // extracting token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attaching decoded user info to request for the next middleware.
      // now we pushed  the decoded id,roled into this req.user , we will use this further for next middleware.
      console.log("the decoded user is", req.user);
      next();
    } catch (err) {
      return res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header missing" });
  }
};

module.exports = verifyToken;
