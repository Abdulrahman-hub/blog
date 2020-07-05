const express = require('express')
const router = express.Router()
const Article = require('./../models/article')

// new Article route
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

// Create Article route
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('articles/new', {
            article: article,
            errorMessage: "Error Creating an Article!"
        })
    }
})

// show Article route
router.get('/:id', async (req, res) => {

})

module.exports = router