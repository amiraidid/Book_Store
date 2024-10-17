const express = require('express')
const cartListController = require('../Controller/cartListController')
const protect  = require('../Middleware/protect')

const router = express.Router()

router.route('/:id').post(protect, cartListController.addtoCartList)
router.route('/').get(cartListController.getDataFromCartList)
router.route('/:id').delete( protect, cartListController.deleteFromCartList)

module.exports =  router
