const express = require('express');
const cors = require('cors');
const axios = require('axios'); 
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// Endpoint to serve user data
app.get('/api/users', async (req, res) => {
    try {
      const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const users = response.data; // Fetched user data from the external API
      res.json(users);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Error fetching user data' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });