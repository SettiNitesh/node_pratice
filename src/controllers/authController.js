import authService from "../services/authService.js";

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const data = await authService.createUser({ name, email, password });

      res.status(201).json({
        message: "User created successfully",
        user: data,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const data = await authService.loginUser({ email, password });

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({
        message: "User Logged in successfully",
        user: data,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const data = await authService.refreshToken(req, res);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async logOut(req, res) {
    try {
      await authService.logOut(req, res);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: true,
        message: error.message,
      });
    }
  }

  async getAllUsers(_req, res) {
    try {
      const users = await authService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: true,
        message: error.message,
      });
    }
  }
}

export default new AuthController();
