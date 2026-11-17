const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({
      message: "Authentication token missing. Please login again."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again."
    });
  }
};

module.exports = authenticateToken;
