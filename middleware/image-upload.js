const multer = require('multer');
const uuid = require('uuid').v4;


// multer gives storage option under diskStorage which receives destination of the file storage after user upload it, and filename , which assign name to the file. Here we use uuid to assign unique names which we concatenate with its original name and file extension.
// In filename, multer require an anonymous function which takes param of req object, file extracted by multer and a callback function which execute the name of file assigned. this callback require a method if any potential error occur if not it will be null, and then the file name assignment if file is successfully extracted
const upload = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: function(req, file, callback) {
            callback(null, uuid() + '-' + file.originalname);
        }
    })
});

const configuredMulterMiddleware = upload.single('image');  // name image assigned in product.ejs

module.exports = configuredMulterMiddleware;