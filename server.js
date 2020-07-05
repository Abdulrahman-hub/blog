const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(process.env.PORT || 3000)