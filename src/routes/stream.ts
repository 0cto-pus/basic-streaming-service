import { Router } from 'express';
import { streamMedia } from '../controllers/streamController';

const router = Router();

router.get('/:filename', streamMedia);

export default router;
