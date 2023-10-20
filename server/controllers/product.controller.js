import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const addNewProduct = async (req, res) => { 
	console.log('adding request:', req.body);
	const product = new Product(req.body) 
	try {
		await product.save()
		return res.status(200).json({ 
		message: "Successfully added!"
	})
	} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
		})
	} 
}
	



const getAllProducts = async (req, res) => { 
	try {
		let products = await Product.find({});
		res.json(products)
	} catch (err) {
		return res.status(400).json({
		error: 'Error Getting All Products' 
		})
	} 
}


const getProductByID = async (req, res, next, id) => {
    try {
        let product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }
        req.product = product;
        next(); // Don't forget to call next() here
    } catch (err) {
        return res.status(400).json({ error: "Could not retrieve product" });
    }
};


const update = async (req, res) => {
    try {
		console.log("here", req.body)
        const id = req.params.productId;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(400).json({
                error: "Product not found"
            });
        }

        res.json(updatedProduct);

    } catch (err) {
    
        return res.status(400).json({
            error: "Error updating product"
        });
    }
};



const removeById = async (req, res, next) => { 
	try {
		let id = req.params.productId;
		let product = await Product.findByIdAndRemove(id);
		if (!product){
		return res.status(400).json({ 
		error: "Product Not Removed"
		})
		}
		
		return res.status(200).json({ 
			message: "Successfully removed product!"
		})
	} catch (err) {
		return res.status(400).json({
		error: "Error deleting product" 
	})
	} 
}


//Delete(remove) All products
const removeAll = async (req, res) => { 
    try {
        await Product.deleteMany({});
        return res.status(200).json({
            message: "Successfully removed all products!"
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error deleting all products" 
        });
    } 
};





//Get product that contains name
const getProductsByName = async (req, res) => {
    try {
        const nameToSearch = req.params.name;
        let products = await Product.find({ 
            name: { $regex: nameToSearch, $options: 'i' } 
        });
        if (products.length === 0) {
            return res.status(400).json({ 
                error: "No products found with the given name" 
            });
        }
        res.json(products);
    } catch (err) {
        return res.status(400).json({ 
            error: "Could not retrieve products" 
        });
    }
};

export default { addNewProduct, removeAll, getProductByID, getAllProducts, removeById, update, getProductsByName }
