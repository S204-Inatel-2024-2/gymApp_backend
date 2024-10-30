import db from 'src\config\bd.ts';

export interface Usuario {
    id_usuario?: number;
    nome: string;
    email: string;
    senha_hash: string;
    data_nascimento?: Date;
    altura?: number;
    peso?: number;
    objetivo?: string;
}

export const UsuarioModel = {
    create: async (usuario: Usuario) => {
        const sql = `INSERT INTO Usuario (nome, email, senha_hash) VALUES (?, ?, ?)`;
        const [result] = await db.execute(sql, [usuario.nome, usuario.email, usuario.senha_hash]);
        return result;
    },
    findByEmail: async (email: string) => {
        const sql = `SELECT * FROM Usuario WHERE email = ?`;
        const [rows] = await db.execute(sql, [email]);
        return rows;
    },
};
