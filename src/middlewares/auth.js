import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (user) => {
  return JWT.sign(
    { userId: user.uid, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // Short lifespan for security
  );
};

export const generateRefreshToken = (user) => {
  return JWT.sign({ userId: user.uid }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d", // Long lifespan
  });
};

export const verifyAccessToken = (token) => {
  try {
    const decoded = JWT.verify(token, ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Access token expired");
    } else {
      throw error;
    }
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const decoded = JWT.verify(token, REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Refresh token expired");
    } else {
      throw error;
    }
  }
};

export const hashPassword = async (password) => {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to hash password");
  }
};

export const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to compare passwords");
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid access token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid access token" });
  }
};
