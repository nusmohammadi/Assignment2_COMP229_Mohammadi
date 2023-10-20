import express from 'express'
import productCtrl from '../controllers/product.controller.js' 

const router = express.Router()

router.route('/api/products') 
	.get(productCtrl.getAllProducts)
	.post(productCtrl.addNewProduct)
	.delete(productCtrl.removeAll)

router.route('/api/products/:productId') 
	.get(productCtrl.getProductByID)
	.put(productCtrl.update) 
	.delete(productCtrl.removeById)
	
	router.route('/api/products/:name')
    .get(productCtrl.getProductsByName);

export default router
