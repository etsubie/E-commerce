import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthenticated!" });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decode);
      req.user = decode;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ message: "Invalid or expired token!" });
    }
  } else {
    return res.status(401).json({ message: "Authentication token missing!" });
  }
};

export default verifyToken;
