const jwt = require("jsonwebtoken");const Role = require("../models/Role.model");

const checkRoles = (allowRoles) => {
  return async (req, res, next) => {
    const { accessToken } = req.cookies;
    const decoded = jwt.decode(accessToken);
    const { roles } = decoded;

    let userRoles = [];

    for (let i = 0; roles.length > i; i++) {
      const foundRole = await Role.findById(roles[i]);

      userRoles.push(foundRole.name);
    }

    let isAllowed = allowRoles.some((role) => userRoles.includes(role));
    if (!isAllowed) {
      return res.status(403).send({ message: "Unauthorized" });
    }
    console.log(`${allowRoles} gain access!! [check]`);
    next();
  };
};

module.exports = checkRoles;
