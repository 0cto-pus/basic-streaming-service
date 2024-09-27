import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/uploadController';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), uploadFile);

export default router;
