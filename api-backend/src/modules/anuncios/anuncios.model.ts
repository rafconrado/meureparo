import { db } from "../../config/database";
import { IAd, ICreateAdDTO, IUpdateAdDTO } from "./anuncios.interface";

interface IDbResult {
  id?: number;
  changes?: number;
}

interface IAdFilter {
  categoryId?: number;
  providerId?: number;
}

export class Ad {
  
  static create(data: any): Promise<IAd> {
    return new Promise((resolve, reject) => {
      const {
        title,
        description,
        price,
        categoryId,
        providerId,
        imageUrl = null,
        discount = 0,
      } = data;

      if (!title || !description || !categoryId || !providerId) {
        return reject(new Error("Campos obrigatórios faltando"));
      }

      const sql = `
        INSERT INTO ANUNCIOS (
          TITLE, DESCRICAO, VALOR, DESCONTO, CATEGORY_ID, ID_USUARIO, IMAGE
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        title,
        description,
        price,
        discount,
        categoryId,
        providerId,
        imageUrl,
      ];

      db.run(sql, params, function (this: any, err: Error | null) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...data } as IAd);
      });
    });
  }

  static findAll(filter: IAdFilter = {}): Promise<IAd[]> {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT 
          a.ID as id, 
          a.TITLE as title, 
          a.DESCRICAO as description, 
          a.VALOR as price, 
          a.DESCONTO as discount, 
          a.CATEGORY_ID as categoryId, 
          a.ID_USUARIO as providerId, 
          a.IMAGE as imageUrl, 
          a.CREATED_AT as createdAt, 
          a.UPDATED_AT as updatedAt,
          a.DESATIVADO as isVerified, -- mapeando provisoriamente
          p.NOME_FANTASIA as providerName, 
          p.EMAIL as providerEmail,
          p.TELEFONE as providerPhone
        FROM ANUNCIOS a
        JOIN PRESTADORES p ON a.ID_USUARIO = p.ID
        WHERE a.DESATIVADO = 'N'
      `;

      const conditions: string[] = [];
      const params: any[] = [];

      if (filter.categoryId) {
        conditions.push("a.CATEGORY_ID = ?");
        params.push(filter.categoryId);
      }

      if (filter.providerId) {
        conditions.push("a.ID_USUARIO = ?");
        params.push(filter.providerId);
      }

      if (conditions.length > 0) {
        sql += " AND " + conditions.join(" AND ");
      }

      sql += " ORDER BY a.CREATED_AT DESC";

      db.all(sql, params, (err: Error | null, rows: any[]) => {
        if (err) {
          console.error("❌ Erro SQL no findAll:", err);
          resolve([]);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  static findById(id: number): Promise<IAd | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          a.ID as id, 
          a.TITLE as title, 
          a.DESCRICAO as description, 
          a.VALOR as price, 
          a.DESCONTO as discount, 
          a.CATEGORY_ID as categoryId, 
          a.ID_USUARIO as providerId, 
          a.IMAGE as imageUrl, 
          a.CREATED_AT as createdAt, 
          a.UPDATED_AT as updatedAt,
          p.NOME_FANTASIA as providerName,
          p.EMAIL as providerEmail,
          p.TELEFONE as providerPhone,
          p.DESCRICAO_EMPRESA as providerDescription
        FROM ANUNCIOS a 
        JOIN PRESTADORES p ON a.ID_USUARIO = p.ID 
        WHERE a.ID = ? AND a.DESATIVADO = 'N'
      `;
      db.get(sql, [id], (err: Error | null, row: IAd) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static findByProviderId(providerId: number): Promise<IAd[]> {
    return this.findAll({ providerId });
  }

  static update(id: number, data: any): Promise<IDbResult> {
    return new Promise((resolve, reject) => {
      const { title, description, price, categoryId, imageUrl, discount } = data;

      const sql = `
        UPDATE ANUNCIOS 
        SET 
          TITLE = COALESCE(?, TITLE), 
          DESCRICAO = COALESCE(?, DESCRICAO), 
          VALOR = COALESCE(?, VALOR), 
          CATEGORY_ID = COALESCE(?, CATEGORY_ID),
          IMAGE = COALESCE(?, IMAGE),
          DESCONTO = COALESCE(?, DESCONTO),
          UPDATED_AT = CURRENT_TIMESTAMP
        WHERE ID = ?
      `;
      const params = [
        title,
        description,
        price,
        categoryId,
        imageUrl,
        discount,
        id,
      ];

      db.run(sql, params, function (this: any, err: Error | null) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  static delete(id: number): Promise<IDbResult> {
    return new Promise((resolve, reject) => {
      // Soft delete
      const sql = "UPDATE ANUNCIOS SET DESATIVADO = 'S' WHERE ID = ?";
      db.run(sql, [id], function (this: any, err: Error | null) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}

export default Ad;