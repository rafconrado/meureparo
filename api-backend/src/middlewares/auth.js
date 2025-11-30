const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token não fornecido ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

exports.checkRole = (allowedRoles) => {
  return (req, res, next) => {
    console.log("🔍 User role:", req.user?.role); // DEBUG
    console.log("🔍 Allowed roles:", allowedRoles); // DEBUG
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para acessar esta rota.",
      });
    }
    next();
  };
};
