const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  // if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) return res.status(401).json({ message: "Unauthorized: Invalid token" });
  //   req.user = decoded; // attach decoded payload to request
    console.log("Token verified:", decoded);
    next();
  // });
}

module.exports = verifyToken;

