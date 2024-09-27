import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { getMediaType } from '../utils/mediaType';
import { logStream } from '../utils/logStream';

export const streamMedia = (req: Request, res: Response): void => {
  try {
    const fileName = req.params.filename;
    const filePath = path.resolve(__dirname, '../../uploads', fileName);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: 'File not found' });
    }

    const fileExt = path.extname(filePath).toLowerCase();
    const contentType = getMediaType(fileExt);

    if (!contentType) {
      res.status(400).json({ message: 'Unsupported media type' });
      return;
    }

    res.setHeader('Content-Type', contentType);

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // At the start of the stream, after the first request is received, a range is initiated for the service (e.g., a player).
      // The HTTP Range [0] is used to obtain the starting bytes, which are then parsed into decimal format.
      // To find the end byte, if specified in the range, we check part 1; otherwise, we can take the total size.
      // It is possible to specify the end byte, depending on our streaming preferences.
      // We store the chunk size after each operation, allowing us to specify the content length.
      // At this point, the status code 206 indicates the response returned after each chunk.
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const fileStream = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
      };

      //Log the chunk and its contents while streaming
      logStream(fileStream);
      res.writeHead(206, head);
      fileStream.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
      };
      res.writeHead(200, head);
      const fileStream = fs.createReadStream(filePath);

      logStream(fileStream);

      fileStream.pipe(res);
    }
  } catch (error) {
    console.error('Error streaming media:', error);
    res.status(500).json({ message: 'Server error while streaming media' });
  }
};
