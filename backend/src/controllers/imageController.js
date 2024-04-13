import axios from 'axios';
import { config } from '../config.js';

export const getImageByCategory = async (req, res) => {
    const { category } = req.params;
    const { page = 1 } = req.query;
    const pageNumber = Number(page);
    const url = `${config.baseUrl}?key=${config.apiKey}&q=${category}&page=${pageNumber}&per_page=9`;
    const url = `${BASE_URL}?key=${API_KEY}&q=${category}&page=${pageNumber}&per_page=9`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching images: ${error.message}`);
        res.status(500).json({ message: "Error fetching images" });
    }
};