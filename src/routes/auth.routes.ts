import { Router } from 'express';
import {  loginAdmin } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema , registerSchema } from '../validations/auth.validations.js';

const router = Router();

router.post('/login', validate(loginSchema), loginAdmin);


export default router;