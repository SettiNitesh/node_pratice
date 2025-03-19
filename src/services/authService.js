import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyRefreshToken,
} from "../middlewares/auth.js";
import authModel from "../models/authModel.js";

class AuthService {
  async getUserByEmail(email) {
    return await authModel.findByEmail(email);
  }

  async getUserById(id) {
    return await authModel.findById(id);
  }

  async getAllUsers() {
    return await authModel.getAll();
  }

  async updateUser(id, data) {
    return await authModel.update(id, data);
  }

  async updateManyUser(where, data) {
    return await authModel.updateMany(where, data);
  }

  async createUser(data) {
    const userExists = await this.getUserByEmail(data.email);

    if (userExists) throw new Error("User already exists");

    const hashedPassword = await hashPassword(data.password);

    return await authModel.create({ ...data, password: hashedPassword });
  }

  async loginUser(data) {
    const user = await this.getUserByEmail(data.email);

    if (!user) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const isValidPassword = await comparePasswords(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    //Generate Tokens

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in DB

    await this.updateUser(user.uid, {
      refreshToken: refreshToken,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);

      const user = await this.getUserById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        const err = new Error("Unauthorized");

        err.statusCode = 401;

        throw err;
      }

      // Generate new tokens
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      await this.updateUser(user.uid, {
        refreshToken: newRefreshToken,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return { newAccessToken };
    } catch (error) {
      const err = new Error("Unauthorized");

      err.statusCode = 403;

      throw err;
    }
  }

  async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await this.updateManyUser(
        {
          refreshToken,
        },
        {
          refreshToken: null,
        }
      );
    }

    res.clearCookie("refreshToken");
  }
}

export default new AuthService();
