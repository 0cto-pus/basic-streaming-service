# Simple Media Streaming Upload Service

This project is a backend service for uploading and streaming media files (images and videos), ensuring that videos are progressively loaded, which is especially useful for large files. It is built using Node.js and TypeScript, following a simple microservices architecture.

## Features

- **Upload Media Files**: Users can upload both images (JPEG, PNG) and videos (MP4) to the server.
- **Stream Media**: The media files are streamed to the client, with videos being loaded in chunks, enabling a smooth viewing experience without having to download the entire file beforehand.
- **Content-Type Handling**: Determines the correct MIME type based on the uploaded file extension.
- **Error Handling**: Handles common errors like unsupported media types or missing files with proper HTTP responses.

## Endpoints

### `POST /upload`
- **Description**: Uploads a media file to the server.
- **Request Body**: Multipart form data containing the file to be uploaded.
- **Response**: Returns the filename and status of the upload.

### `GET /stream/:filename`
- **Description**: Streams the requested media file (image or video) to the client.
- **Parameters**:
  - `filename`: The name of the media file to be streamed.
- **Response**: Streams the requested media file in chunks for videos, while images are served directly.

## Technical Overview

### Project Structure
- **Controllers**: Contains logic for handling file uploads and streaming (`streamController.ts`).
- **Utils**: Includes utility functions, such as determining the content type based on the file extension (`mediaType.ts`).
- **Routes**: Defines API endpoints and maps them to the respective controller functions.
- **Middleware**: Uses Multer for handling file uploads and processes multipart/form-data requests.

### Key Technologies
- **Node.js & Express**: Used for building the backend server and defining API routes.
- **Multer**: Handles file uploads, enabling users to easily upload large media files.
- **TypeScript**: Adds type safety to the codebase for improved readability and maintainability.
- **fs & Stream APIs**: Utilized to handle file operations, including reading files and streaming content.

### Streaming Logic
- The service uses Node.js streams to efficiently manage memory and bandwidth.
- When a video is requested, the server reads and sends it in chunks rather than loading the entire file into memory. This allows for progressive downloading, improving load times and reducing memory consumption.
- The `Range` header is used to determine which part of the video file to serve, enabling seamless video playback without interruptions.
