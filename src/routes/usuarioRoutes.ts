import { Router } from 'express';
import { createUsuario } from 'src\http\controllers\users\usuarioController.ts';

const router = Router();

router.post('/usuario', createUsuario);
export default router;
