const express = require('express')
const router = express.Router()
const Article = require('./../models/article')

// new Article route
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article(), searchOptions: req.query })
})

// Create Article route
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

// show Article route
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article, searchOptions: req.query })
})

// edit Article route
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article, searchOptions: req.query })
})

// update Article route
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

// Delete Article route
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, {
                article: article,
                errorMessage: "Error Creating an Article!",
                searchOptions: req.query
            })
        }
    }
}

module.exports = router