import { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).send({ message: 'No file uploaded' });
      return;
    }

    res.status(200).send({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ message: 'Upload error' });
  }
};
