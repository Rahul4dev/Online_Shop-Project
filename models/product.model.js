const mongoDb = require('mongodb');
const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.image = productData.image;  // name of the imageFile
        this.summary = productData.summary;
        this.price = +productData.price;  // adding plus will ensure the input will be a number.
        this.description = productData.description;
        this.updateImageData();
        if(productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findById(productId) {
        let prodId;
        try {
            prodId = new mongoDb.ObjectId(productId);            
        } catch (error) {
            error.code = 404;
			throw error;            
        }
        const product = await db.getDb().collection('products').findOne({_id: prodId });
        
        if(!product) {
            const error = new Error('Could not find product with this id');
            error.code = 404;
            throw error;
        }

        return new Product(product);
    }

    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();
       
        return products.map(function(productDocument) {
            return new Product(productDocument);
       }); 
    }

    updateImageData() {
		this.imagePath = `product-data/images/${this.image}`; // path of the image where it is stored
		this.imageUrl = `/products/assets/images/${this.image}`; // address of the image in the server to request the image in frontSide JS code.
	}

    async save() {
        const productData = {
            title : this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,
        };

        if(this.id){
            const productId = new mongoDb.ObjectId(this.id);
            
            if(!this.image) {
                delete productData.image;
            }

            await db.getDb().collection('products').updateOne({_id: productId}, {$set: productData  });
        } else {
            await db.getDb().collection('products').insertOne(productData);
        }
    }

    replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }

    remove() {
        const productId = new mongoDb.ObjectId(this.id);
        return db.getDb().collection('products').deleteOne({_id: productId});
    }
}

module.exports = Product;