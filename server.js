if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const Article = require('./models/article')

mongoose.connect(process.env.DATABASE_URL, {
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
app.use(express.static('public'))

app.get('/', async (req, res) => {
    let query = Article.find().sort({createdAt: 'desc'})
    if (req.query.title != null && req.query.title != "") {
            query = query.regex('title', new RegExp(req.query.title, 'i'))
        }
        const articles = await query.exec()
        res.render('articles/index', {
            articles: articles,
            searchOptions: req.query
        })
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 3000)