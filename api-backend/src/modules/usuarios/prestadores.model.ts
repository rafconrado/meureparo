import { db } from "../../config/database";
import bcrypt from "bcryptjs";
import { IProvider, ICreateProviderDTO } from "./prestadores.interface";

export class Provider {
  /**
   * Encontra um prestador pelo CNPJ.
   */
  static findByCnpj(cnpj: string): Promise<IProvider | undefined> {
    return new Promise((resolve, reject) => {
      // TRADUÇÃO: Coluna do Banco (Caps) AS Propriedade do Objeto (camelCase)
      const sql = `
        SELECT 
          ID as id, 
          NOME_FANTASIA as nomeFantasia, 
          CNPJ as cnpj, 
          EMAIL as email, 
          TELEFONE as telefone,
          DESCRICAO_EMPRESA as descricaoEmpresa,
          ROLE as role
        FROM PRESTADORES 
        WHERE CNPJ = ?
      `;
      db.get(sql, [cnpj], (err: Error | null, row: IProvider) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Encontra um prestador pelo Email.
   */
  static findByEmail(email: string): Promise<IProvider | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
            ID as id, 
            NOME_FANTASIA as nomeFantasia, 
            CNPJ as cnpj, 
            EMAIL as email, 
            SENHA as senha,
            TELEFONE as telefone,
            ROLE as role,
            DESCRICAO_EMPRESA as descricaoEmpresa
        FROM PRESTADORES 
        WHERE EMAIL = ?
      `;
      db.get(sql, [email], (err: Error | null, row: IProvider) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Cria um novo prestador no banco de dados.
   */
  static create(providerData: ICreateProviderDTO): Promise<IProvider> {
    return new Promise(async (resolve, reject) => {
      const {
        name, 
        cnpj,
        email,
        password,
        phone,
        servico,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
      } = providerData;

      // Criptografa a senha antes de salvar
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO PRESTADORES (
            NOME_FANTASIA, CNPJ, EMAIL, SENHA, TELEFONE, 
            DESCRICAO_EMPRESA, CEP, LOGRADOURO, NUMERO, 
            COMPLEMENTO, BAIRRO, CIDADE, UF, ROLE
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const params = [
        name,
        cnpj,
        email,
        hashedPassword,
        phone,
        servico || null, 
        cep || null,
        logradouro || null,
        numero || null,
        complemento || null,
        bairro || null,
        cidade || null,
        uf || null,
        'PRESTADOR' 
      ];

      db.run(sql, params, function (this: any, err: Error | null) {
        if (err) reject(err);
        else {
            const createdProvider: IProvider = {
                id: this.lastID,
                nomeFantasia: name,
                cnpj,
                email,
                telefone: phone,
                role: 'PRESTADOR',
                descricaoEmpresa: servico,
            };
            resolve(createdProvider);
        }
      });
    });
  }
}

export default Provider;