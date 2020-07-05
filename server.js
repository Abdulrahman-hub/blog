const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/blog', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    })

const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 3000)