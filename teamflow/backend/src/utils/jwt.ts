import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    "secret",
    { expiresIn: "1d" }
  );
};