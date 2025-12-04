import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, IUserPayload } from './interface';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token não fornecido ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Forçamos o tipo do retorno do verify para nossa interface IUserPayload
    const decoded = jwt.verify(token, JWT_SECRET) as IUserPayload;
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

export const checkRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("🔍 User role:", req.user?.role); 
    console.log("🔍 Allowed roles:", allowedRoles); 

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Acesso negado. Você não tem permissão para acessar esta rota.",
      });
    }
    next();
  };
};