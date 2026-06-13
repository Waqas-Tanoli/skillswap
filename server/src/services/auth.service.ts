import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/generateToken";

class AuthService {
  async register(username: string, email: string, password: string) {
    email = email.toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
  id: user._id.toString(),
  email: user.email,
});
    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  }

  async login(email: string, password: string) {
    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
   id: user._id.toString(),
      email: user.email,
    });

    return token;
  }
}

export default new AuthService();