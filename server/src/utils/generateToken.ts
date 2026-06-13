import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/IJwtPayload";

export const generateToken = (user: IJwtPayload) => {
  const payload = {
    id: user.id,
    email: user.email, 
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1h",
  });
}  ;    