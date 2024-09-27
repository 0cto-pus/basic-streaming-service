import { ReadStream } from 'fs';

export const logStream = (fileStream: ReadStream) => {
  fileStream.on('data', (chunk) => {
    console.log(`Chunk received (${chunk.length} bytes):`, chunk);
  });
};
