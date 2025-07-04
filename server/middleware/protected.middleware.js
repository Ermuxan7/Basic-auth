import jwt from "jsonwebtoken";

export const protectedMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
