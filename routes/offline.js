const express = require('express')
const router = express.Router();

/** Home route **/
router.get('/offline', (req, res) => {
    res.render('pages/offline');
})

module.exports = router;