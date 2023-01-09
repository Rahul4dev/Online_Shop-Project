const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.image = productData.image;  // name of the imageFile
        this.summary = productData.summary;
        this.price = +productData.price;  // adding plus will ensure the input will be a number.
        this.description = productData.description;
        this.imagePath = `product-data/images/${productData.image}`; // path of the image where it is stored
        this.imageUrl = `/products/assets/images/${productData.image}`;  // address of the image in the server to request the image in frontSide JS code.
    }

    async save() {
        const productData = {
            title : this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,
        };
        
        await db.getDb().collection('products').insertOne(productData);
    }
}

module.exports = Product;