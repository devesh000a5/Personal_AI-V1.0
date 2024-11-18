const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

const API_KEY = 'Your_api_key'

// Enable CORS for the specified origin
app.use(cors({
    origin: 'Port_address_of_index.html' // Allow only this origin
}));

app.use(express.json());

// // Test endpoint to verify the server is running
// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });

// Define the /generate-template POST endpoint
app.post('/generate-template', async (req, res) => {
    const prompt = req.body.prompt; // Get the prompt from the request body

    // if (!prompt) {
    //     return res.status(400).json({ error: 'Prompt is required' });
    // }

    try {
        // Send request to netwok
        const response = await axios.post('Enter_Api_Url', {
            "model": "Enter_Model_name", 
            messages: [
                // {role: "system", "content": "You are an AI ."},
                    { role: "user", content: prompt }],
            max_tokens: 100
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
        }});

        // Respond to the frontend with the generated code or text
        const content = response.data.choices?.[0]?.message?.content?.trim();
        res.json({
            code: content || 'No content generated' // Safely access the content and provide fallback
        });
    } catch (error) {
        console.error('Error calling AI API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
