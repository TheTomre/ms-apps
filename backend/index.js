import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable if available

app.use(cors());
app.use(express.json()); // Enable JSON body parsing for POST requests

const API_KEY = process.env.API_KEY || '43362730-b4675b50e0a92a2b705abcfc2'; // Use environment variable if available
const BASE_URL = 'https://pixabay.com/api/';

app.get('/images/:category', async (req, res) => {
    const { category } = req.params;
    const { page = 1 } = req.query;
    const pageNumber = Number(page);

    const url = `${BASE_URL}?key=${API_KEY}&q=${category}&page=${pageNumber}&per_page=9`;


    try {
    const response = await axios.get(url);
    res.json(response.data);
} catch (error) {
    console.error(`Error fetching images: ${error.message}`);
    res.status(500).json({ message: "Error fetching images" });
}
});

app.use((err, req, res, next) => { // Error handling middleware
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});