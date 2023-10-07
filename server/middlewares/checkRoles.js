const jwt = require("jsonwebtoken");
const checkRoles = (allowRoles) => {
  return async (req, res, next) => {
    const { accessToken } = req.cookies;
    const decoded = await jwt.decode(accessToken);
    const { roles } = decoded;

    let isAllowed = allowRoles.some((role) => roles.includes(role));
    if (!isAllowed) {
      return res.status(403).send({ message: "Unauthorized" });
    }
    next;
  };
};

module.exports = checkRoles;
