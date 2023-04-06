const express = require('express')
const router = express.Router();

/** Offline page route **/
router.get('/offline', (req, res) => {
    res.render('pages/offline');
})

module.exports = router;