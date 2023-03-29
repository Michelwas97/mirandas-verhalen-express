const express = require('express')
const router = express.Router();
const storyController = require('../controllers/story-controller');

/** Home route **/
router.get('/', async (req, res) => {
    const stories = await storyController.handleData();

    if (!stories) {
        // TODO: error render page??
        return;
    }

    res.render('pages/index', { storyData: stories});
})

module.exports = router;