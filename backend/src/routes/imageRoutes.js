import { Router } from 'express';
import { getImageByCategory } from '../controllers/imageController.js';

const router = Router();

router.get('/images/:category', getImageByCategory);

export default router;