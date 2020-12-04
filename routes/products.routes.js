const {Router} = require('express')
const router = Router()
const productsController = require("./products.controller");

// /api/products/
router.get('/all', productsController.getAll)

router.get('/product/:id', productsController.getOne)

router.get('/vendors', productsController.getVendors)

module.exports = router