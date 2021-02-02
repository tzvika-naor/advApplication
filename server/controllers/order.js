const Order = require('../models/order');
const Product = require('../models/product')

exports.getOrders = (req, res, next) =>{
    console.log('i am Order controller')
    const orderQuery = Order.find().//return all the Orders
    populate('smartphones').
    populate('userId').
    then(documents =>
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
    console.log(req.body)
    console.log(req.body.smartphones)
    const order = new Order({
        smartphones: req.body.smartphones,
        userId: req.body.userId
    });
    order.save().then(createdOrder =>
    {
        console.log(createdOrder)
        res.status(201).json({
            message: "Order added successfully",
            order: {
                id: createdOrder._id,
                date: createdOrder.date,
                status: createdOrder.status,
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

exports.updateOrder = (req, res, next) =>
{
    console.log("Before Update",req.body)
    console.log("Update Order")
    const newSmartphones = req.body.smartphones.map((el)=>{
        return {
            id: el.id,
            itemCount: el.itemCount
        }
    });

    console.log("Arrary Before Update",newSmartphones)
    const order = {
        userId: req.body.userId,
        smartphones: newSmartphones,
        totalPrice: req.body.totalPrice,
    };
    order.updateOne(
        { _id: req.body.id },
         order,
         {new: true})
         .then(result =>{
             console.log(result);
        //if (result.n > 0) {
            return res.status(200).json({
                message: "update Order successful!",
                order: result
            })
        // } else {
            // res.status(401).json({ message: "Not authorized!" });
        // }
    }).err(err=>{
        if (err)
            return res.status(404).end();
    });
}

exports.deleteOrder = (req, res, next) =>
{
    Order.deleteOne({ _id: req.params.id }).then(result =>
    {
        if (result.n > 0) {
            res.status(200).json({
                message: "Deletion successfull!"
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