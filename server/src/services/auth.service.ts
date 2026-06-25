import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/generateToken";

class AuthService {
  async register(
    username: string,
    email: string,
    password: string
  ) {
    email = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username: username.trim(),
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(email: string, password: string) {
    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

export default new AuthService();