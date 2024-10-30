import { Request, Response } from 'express';
import { UsuarioModel, Usuario } from 'src\models\Usuario.ts';

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const { nome, email, senha_hash }: Usuario = req.body;
        const result = await UsuarioModel.create({ nome, email, senha_hash });
        res.status(201).json({ id_usuario: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};
