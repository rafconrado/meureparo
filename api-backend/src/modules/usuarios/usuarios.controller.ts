import { Request, Response } from 'express';
import { db } from '../../config/database';
import { IClientSummary, IProviderSummary } from './usuarios.interface';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [clients, providers] = await Promise.all([
      // Busca Clientes 
      new Promise<IClientSummary[]>((resolve, reject) => {
        const sql = `
          SELECT 
            ID as id, 
            NOME as name, 
            EMAIL as email, 
            TELEFONE as phone, 
            ROLE as role 
          FROM CLIENTES
        `;
        
        db.all(sql, [], (err: Error | null, rows: IClientSummary[]) => {
          if (err) return reject(err);
          resolve(rows || []);
        });
      }),

      // Busca Prestadores
      new Promise<IProviderSummary[]>((resolve, reject) => {
        const sql = `
          SELECT 
            ID as id, 
            NOME_FANTASIA as name, 
            EMAIL as email, 
            TELEFONE as phone, 
            ROLE as role,
            DESCRICAO_EMPRESA as servico 
          FROM PRESTADORES
        `;
        
        db.all(sql, [], (err: Error | null, rows: IProviderSummary[]) => {
          if (err) return reject(err);
          resolve(rows || []);
        });
      }),
    ]);

    return res.status(200).json({ clients, providers });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuários.",
      error: (error as Error).message,
    });
  }
};