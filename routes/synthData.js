const express = require('express')
const router = express.Router();
const storyApi = require('../models/storyApi.js');

/** Synthesizer data route **/
router.get('/api/stories', async (req, res) => {
    const stories = await storyApi.getStories();

    res.json(stories);
});

module.exports = router;