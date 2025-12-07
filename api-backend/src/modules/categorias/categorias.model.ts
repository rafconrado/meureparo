import { db } from "../../config/database";
import {
  ICategory,
  ICreateCategoryDTO,
  IDbResult,
} from "./categorias.interface";

export class Category {
  static create(data: ICreateCategoryDTO): Promise<ICategory> {
    return new Promise((resolve, reject) => {
      const { name, icon } = data;

      const sql = `INSERT INTO CATEGORIAS (NOME, ICON) VALUES (?, ?)`;
      const params = [name, icon || null];

      db.run(sql, params, function (err: Error | null) {
        if (err) reject(err);
        // 'this' aqui se refere ao contexto do statement do sqlite3
        else
          resolve({ id: this.lastID, name, icon: icon || null } as ICategory);
      });
    });
  }

  static findAll(): Promise<ICategory[]> {
    return new Promise((resolve) => {
      const sql = `SELECT ID as id, NOME as name, ICON as icon, DESATIVADO, CREATED_AT, UPDATED_AT FROM CATEGORIAS WHERE DESATIVADO = 'N' ORDER BY NOME`;

      db.all(sql, [], (err: Error | null, rows: ICategory[]) => {
        if (err) {
          console.error("Erro ao buscar categorias:", err);
          resolve([]);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  static findById(id: number): Promise<ICategory | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ID as id, NOME as name, ICON as icon FROM CATEGORIAS WHERE ID = ? AND DESATIVADO = 'N'`;

      db.get(sql, [id], (err: Error | null, row: ICategory) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static update(id: number, data: ICreateCategoryDTO): Promise<IDbResult> {
    return new Promise((resolve, reject) => {
      const { name, icon } = data;
      const sql = `UPDATE CATEGORIAS SET NOME = ?, ICON = ?, UPDATED_AT = CURRENT_TIMESTAMP WHERE ID = ?`;

      db.run(sql, [name, icon, id], function (err: Error | null) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  static delete(id: number): Promise<IDbResult> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE CATEGORIAS SET DESATIVADO = 'S' WHERE ID = ?`;

      db.run(sql, [id], function (err: Error | null) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}

export default Category;
