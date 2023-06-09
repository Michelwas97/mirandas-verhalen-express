const express = require('express')
const router = express.Router();
const storyApi = require('../models/storyApi.js');

/** Home route **/
router.get('/', async (req, res) => {
    const stories = await storyApi.getStories();

    if (!stories) {
        // TODO: error render page??
        return;
    }

    res.render('pages/index', { storyData: stories});
})


module.exports = router;