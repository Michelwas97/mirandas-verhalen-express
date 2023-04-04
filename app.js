/** Variabelen **/
const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = 3000

const homeRouter = require('./routes/home')
const apiRouter = require('./routes/synthData');
const offlineRouter = require('./routes/offline');

app.use(express.static('public'))

app.set('view engine', 'ejs')

/** ROUTES **/
app.use(homeRouter)
app.use(apiRouter)
app.use(offlineRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});