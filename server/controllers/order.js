const Order = require('../models/order');
const Product = require('../models/product')
exports.getOrders = (req, res, next) =>{
    console.log('i am Order controller')
    const orderQuery = Order.find();//return all the Orders
    orderQuery.then(documents =>
    {
        console.log(documents)
        fetchedOrders = documents;
        return Order.count() // returns all the number of that match query from this database... we made no filtering so we got all 100 Orders
    }).then(count =>
    {
        console.log(count)
        res.status(200).json({
            message: 'Orders fetch succesfully!',
            orders: fetchedOrders,
            maxOrders: count
        })
    })

}
// exports.getOrder = (req, res, next) =>
// {
//     console.log(req.params.id)
//     Order.findById(req.params.id).then(Order =>
//     {
//         console.log(Order)
//         if (Order) {
//             res.status(200).json(Order)
//         } else {
//             res.status(404).json({ message: 'Order not found!' });
//         }
//     }).catch(error =>
//     {
//         res.status(500).json({
//             message: 'Fetching posts failed!'
//         });
//     });
// };

exports.createOrder = (req, res, next) =>
{
    console.log(req.body.id)
    const order = new Order({
        smartphones: req.body.id,
        numberOfProucts: req.body.totalPrice,
        // customerId: req.body.customerId,
        // totalPrice: req.body.totalPrice
    });
    order.save().then(createdOrder =>
    {
        res.status(201).json({
            message: "Order added successfully",
            order: {
                id: createdOrder._id,
                // products: createdOrder.products,
                // numberOfProucts: createdOrder.numberOfProucts,
                // customerId: createdOrder.customerId,
                // totalPrice: createdOrder.totalPrice,
            }
        });
    })
        .catch(error =>
        {
            res.status(500).json({
                message: 'Creating a Order failed!'
            });
        });
};
// exports.updateOrder = (req, res, next) =>
// {

//     console.log(req.body)
//     const Order = new Order({
//         products: req.body.products,
//         numberOfProucts: req.body.numberOfProucts,
//         customerId: req.body.customerId,
//         totalPrice: req.body.totalPrice,
//     });
//     Order.updateOne({ _id: req.params.id }, Order).then(result =>
//     {
//         if (result.n > 0) {
//             res.status(200).json({
//                 message: "update successful!"
//             })
//         } else {
//             res.status(401).json({ message: "Not authorized!" });
//         }
//     });
// }
// exports.deleteOrder = (req, res, next) =>
// {
//     Order.deleteOne({ _id: req.params.id }).then(result =>
//     {
//         if (result.n > 0) {
//             res.status(200).json({
//                 message: "Deletion successful!"
//             })
//         } else {
//             res.status(401).json({ message: "Not authorized!" });
//         }
//     })
//         .catch(error =>
//         {
//             res.status(500).json({
//                 message: "Fetching posts failed!"
//             });
//         });
// }