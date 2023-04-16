const tokenService = require("../services/token.service");

const sendError = (res) => res.status(401).json({ message: "Unautorized" });

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return sendError(res);
    }

    const data = tokenService.validateAccess(token);

    if (!data) {
      return sendError(res);
    }

    req.user = data;

    next();
  } catch (error) {
    sendError(res);
  }
};
