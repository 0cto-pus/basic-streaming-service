// Set media type
export const mediaTypes: { [key: string]: string } = {
  '.mp4': 'video/mp4',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
};

export const getMediaType = (fileExt: string): string | undefined => {
  return mediaTypes[fileExt.toLowerCase()];
};
