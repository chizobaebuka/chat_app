import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()); // for parsing middleware configuration application/json configuration
app.use(cookieParser()); // for parsing cookies

const PORT = process.env.PORT || 5001;


app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add Socket.io to the server
// configure the server for deployment 

