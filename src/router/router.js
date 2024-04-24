const express = require("express");
const router = express.Router();
const accountController = require("../controller/accountController.js");
const productController = require("../controller/productController.js");
const checkToken = require("../middleware/auth.js");
const cartController = require("../controller/cartController.js");
const orderController = require("../controller/orderController.js");


//router auth
router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.put('/account/update/:id', checkToken,accountController.updateProduct);
router.delete('/account/delete/:id', checkToken,accountController.deleteAccount);

//router product
router.post('/product/create', productController.createProduct);
router.post('/product/create-detail', productController.createDetailProduct);
router.delete('/product/delete/:id/:color/:size', productController.deleteProduct);
router.put('/product/update/:id', productController.editProduct);
router.put('/product/update-detail/:id/:color/:size', productController.editDetailProduct);

router.get('/add-to-cart/:id/:color/:size', cartController.addToCart);
router.get('/get-cart', cartController.getCart);
router.delete('/delete-cart/:id', cartController.deleteCart);


router.get('/order', orderController.createOrder);

module.exports = router;

