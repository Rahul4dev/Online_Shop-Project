function getProducts(req, res) {
    res.render('admin/products/all-products');
}

function getNewProducts(req, res) {
    res.render("admin/products/new-products");
}

function createNewProducts() {}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProducts: createNewProducts
}