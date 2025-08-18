import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, role }
    next();
  } catch {
    return res.status(401).json({ error: "invalid_token" });
  }
}
