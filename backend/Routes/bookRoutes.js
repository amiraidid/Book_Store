const express = require('express')
const bookController = require("../Controller/bookController")

const router = express.Router();

router.route('/').get(bookController.getBooks)
router.route('/book/:name').get(bookController.getOneBook)
router.route('/bookid/:id').get(bookController.singleBook)
router.route('/checkout/:id').get(bookController.singleBook)
router.route('/suggestions').get(bookController.suggestions)

module.exports = router