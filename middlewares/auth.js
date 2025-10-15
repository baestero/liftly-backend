import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: ["Token não fornecido"] });
  }

  try {
    const deccoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = deccoded;
    next();
  } catch (err) {
    res
      .status(403)
      .json({ message: ["Sessão expirada. Faça o login novamente!"] });
  }
};
