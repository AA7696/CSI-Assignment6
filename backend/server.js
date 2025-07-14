const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Get top tracks
app.get('/deezer/tracks', async (req, res) => {
  try {
    const response = await fetch('https://api.deezer.com/chart/0/tracks');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
});

// Get albums by genre
app.get('/deezer/genre/:id/albums', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://api.deezer.com/genre/${id}/artists`);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genre albums' });
  }
});

// Get all genres
app.get('/deezer/genres', async (req, res) => {
  try {
    const response = await fetch('https://api.deezer.com/genre');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
