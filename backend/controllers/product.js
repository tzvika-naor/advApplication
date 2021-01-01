const Product = require('../models/product');

exports.getProducts = (req, res, next) =>
{
    const ProductQuery = Product.find();//return all the Product
    ProductQuery.then(documents =>
    {
         fetchedProducts = documents;
         categories = fetchedProducts.map((product) => {
            return product.category
         })
         uniqCategories = [...new Set(categories)];
        return Product.countDocuments() // returns all the number of that match query from this database... we made no filtering so we got all 100 cars
    }).then(count =>
    {
        // console.log(count)
        res.status(200).json({
            message: 'product fetch succesfully!',
            products: fetchedProducts,
            category: uniqCategories,
            maxProducts: count
        })
    })

}
exports.getProduct = (req, res, next) =>
{
    console.log(req.params.id)
    Product.findById(req.params.id).then(document =>
    {
        console.log(document)
        if (document) {
            res.status(200).json(product)
        } else {
            res.status(404).json({ message: 'product not found!' });
        }
    }).catch(error =>
    {
        res.status(500).json({
            message: 'Fetching posts failed!',
            error: error
        });
    });
};

exports.createProduct = (req, res, next) =>
{
    console.log(req.body);
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image
    });
    console.log(product)
    product.save().then(newProduct =>
    {
        res.status(201).json({
            message: "product added successfully",
            product: {
                title: newProduct.title,
                price: newProduct.price,
                description: newProduct.description,
                category: newProduct.category,
                image: newProduct.image
            }
        });
    })
        .catch(error =>
        {
            res.status(500).json({
                message: 'Creating a product failed!',
                // error: error
            });
        });
};
exports.updateProduct = (req, res, next) =>
{
console.log(req.params.id )
    // console.log(req.body)
       const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    });
    product._id = req.params.id;
    Product.updateOne({ _id: req.params.id } , product ).then(result =>
    {
        if (result.n > 0) {
            res.status(200).json({
                message: "update successful!"
            })
        } else {
            res.status(401).json({
                message: "Not authorized!"
            });
        }
    });
}
exports.deleteProduct = (req, res, next) =>
{
    console.log(req.params.id)
    Product.deleteOne({ _id: req.params.id }).then(result =>
    {
        if (result.n > 0) {
            res.status(200).json({
                message: "Deletion successful!"
            })
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error =>
        {
            res.status(500).json({
                message: "Fetching posts failed!"
            });
        });
}
