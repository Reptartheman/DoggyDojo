const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

// Set token secret and expiration date
const secret = "JWT_SECRET";
const expiration = "2h";

module.exports = {
  // Function for our authenticated routes
  authMiddleware: function ({ req }) {
    // Allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // Verify token and get user data out of it
    try {
      const data = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      return res.status(400).json({ message: "invalid token!" });
    }

    // Send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    const token = jwt.sign(payload, secret, {
      expiresIn: expiration,
    });

    return token;
  },
};
