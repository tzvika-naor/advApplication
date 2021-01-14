
const Cart = require('../models/cart');

exports.getCarts = (req, res, next) => {
    const CartQuery = Cart.find();//return all the Carts
    CartQuery.then(documents => {
        fetchedCarts = documents;
        return Cart.count() // returns all the number of that match query from this database... we made no filtering so we got all 100 Carts
    }).then(count => {
        res.status(200).json({
            message: 'Carts fetch succesfully!',
            Carts: fetchedCarts,
            maxCarts: count
        })
    })
}
exports.getCart = (req, res, next) => {
    Cart.findById(req.params.id).then(Cart => {
        if (Cart) {
            res.status(200).json(Cart)
        } else {
            res.status(404).json({ message: 'Cart not found!' });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
};

exports.createCart = (req, res, next) => {
    const cart = new Cart({
        smartphone: req.body.smartphone,
        numberOfProucts: req.body.numberOfProucts,
        // customerId: req.body.customerId,
        totalPrice: req.body.totalPrice
    });
    cart.save().then(createdCart => {
        res.status(201).json({
            message: "Cart added successfully",
            cart: {
                id: createdCart._id
                // createdCart: createdCart
                // numberOfProucts: createdCart.numberOfProucts 
                // customerId: createdCart.customerId,
                // totalPrice: fetchData.totalPrice
            }
        });
    })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a Cart failed!'
            });
        });
};
exports.updateCart = (req, res, next) => {
    const cart = new Cart({
        products: req.body.products,
        numberOfProucts: req.body.numberOfProucts,
        customerId: req.body.customerId,
        totalPrice: req.body.totalPrice,
    });
    Cart.updateOne({ _id: req.params.id }, cart).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "update successful!"
            })
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    });
}
exports.deleteCart = (req, res, next) => {
    Cart.deleteOne({ _id: req.params.id }).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "Deletion successful!"
            })
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching posts failed!"
            });
        });
}
