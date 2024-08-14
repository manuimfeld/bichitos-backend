require("dotenv").config();
const jwt = require("jsonwebtoken");

const signJwt = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "14d" });

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

const authorizeRole = (authorizedRole) => {
  return (req, res, next) => {
    if (req.user.role !== authorizedRole) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
};

module.exports = {
  signJwt,
  authenticateJWT,
  authorizeRole,
};
