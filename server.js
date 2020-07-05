const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })

const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('articles/index')
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 3000)