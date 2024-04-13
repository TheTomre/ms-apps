import express from 'express';
import cors from 'cors';
import  imageRoutes  from './routes/imageRoutes.js';
import { errorHandler } from './utils/errorHandler.js';

require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', imageRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


