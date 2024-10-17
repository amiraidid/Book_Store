const express = require('express');
const authorize = require('../Middleware/roleMiddleware');
const protect = require('../Middleware/protect');
const adminController = require('../Controller/adminControllers')

const router = express.Router();

router.route('/users').get(protect , authorize('admin'), adminController.getUsers)
router.route('/add-book').post(protect , authorize('admin'), adminController.addBook)
router.route('/book/:id').delete(protect , authorize('admin'), adminController.deleteBook)
router.route('/book/update/:id').put(protect , authorize('admin'), adminController.updateBook)


module.exports = router