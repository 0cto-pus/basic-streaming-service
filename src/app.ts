import express from 'express';
import uploadRoutes from './routes/upload';
import streamRoutes from './routes/stream';

const app = express();

app.use(express.json());

// Routes
app.use('/upload', uploadRoutes);
app.use('/stream', streamRoutes);

export default app;
