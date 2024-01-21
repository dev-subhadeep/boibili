const { jwtpk } = require("../utils/constants.js");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1] || null;
  try {
    if (token) {
      console.log(token);
      const data = await jwt.verify(token, jwtpk);
      if (data) {
        const user = await User.findOne({ _id: userId });
        if (!user.verified)
          return res
            .status(403)
            .json({ error: "You must be verified to proceed." });
        req.user = data;
        return next();
      }
    }

    return res.status(401).json({ error: "Please log in to continue" });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

module.exports = auth;
