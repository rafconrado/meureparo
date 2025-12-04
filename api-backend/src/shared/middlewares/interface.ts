import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUserPayload extends JwtPayload {
  id?: number | string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: IUserPayload;
}