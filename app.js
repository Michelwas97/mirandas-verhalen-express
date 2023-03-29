/** Variabelen **/
const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = 3000

const homeRouter = require('./routes/home')

app.use('/static', express.static('./static'))
app.use('/style', express.static('./static/styles'))
app.use('/img', express.static('./static/images'))
app.use('/js', express.static('./static/scripts'))
app.use('/font', express.static('./static/fonts'))
app.set('view engine', 'ejs')

/** ROUTES **/
app.use(homeRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});