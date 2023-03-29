const express = require('express')
const router = express.Router();
const home = require('../controllers/home-controller')

/** Home route **/
router.get('/', home) 

module.exports = router;