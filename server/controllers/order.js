const Order = require('../models/order');

exports.searchOrders = async (req, res, next) => {

    console.log(req.body)
    const from_day = req.body.from_date.substring(0, 2)
    console.log(JSON.parse(from_day))
    const from_month = req.body.from_date.substring(3, 5)
    const from_year = req.body.from_date.substring(6, 10)
    const from_date = new Date(from_year, from_month - 1, JSON.parse(from_day)+1 )

    console.log(from_date);

    const to_day = req.body.to_date.substring(0, 2)
    const to_month = req.body.to_date.substring(3, 5)
    const to_year = req.body.to_date.substring(6, 10)
    const to_date = new Date(to_year, to_month - 1,  JSON.parse(to_day)+1  )

    console.log(to_date);


    fetchOrders = await Order.find({
        "status": req.body.status,
        "userId": req.body.userId,
        "date": { $gte: from_date, $lt: to_date }
    }).populate('userId')
    .populate({ path: 'smartphones', populate: { path: 'id' } })
   
    res.status(201).json({
        message: "Order added successfully",
        order: {
            orders: fetchOrders
        }
    });
}


exports.getOrders = async (req, res, next) => {
    const status = await Order.aggregate([{ $group: { _id: "$status" } }])
    const dates = await Order.aggregate([{

        $project: {
            daymonthYear: {
                $dateToString: { format: "%d-%m-%Y", date: "$date" }
            }
        }
    }
    ])
    var newDate = [];
    dates.map(date => {
        if (!newDate.includes(date.daymonthYear)) {
            newDate.push(date.daymonthYear)
        }
    })
    const userId = await Order.aggregate([{ $group: { _id: "$userId" } }])
    console.log(newDate)
    const orderQuery = await Order.find()//return all the Orders
        .populate('userId')
        .populate({ path: 'smartphones', populate: { path: 'id' } })
        .then(documents => {
            // console.log(documents)
            fetchedOrders = documents;
            return Order.count() // returns all the number of that match query from this database... we made no filtering so we got all 100 Orders
        }).then(count => {
            res.status(200).json({
                status: status,
                dates: newDate,
                userId: userId,
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

exports.createOrder = (req, res, next) => {
    const smartphonesIds = req.body.smartphonesIds
    var smartphones = [];
    smartphonesIds.map(s => {
        smartphones.push({ id: s.id, quantity: s.qnt })
    })
    const order = new Order({
        smartphones: smartphones,
        userId: req.body.userId,
        status: req.body.status
    });
    order.save().then(createdOrder => {
        res.status(201).json({
            message: "Order added successfully",
            order: {
                id: createdOrder._id,
                date: createdOrder.date,
                status: createdOrder.status,
            }
        });
    })
        .catch(error => {
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
exports.deleteOrder = (req, res, next) => {
    Order.deleteOne({ _id: req.params.id }).then(result => {
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

//
exports.getTotalAmountByUser = async (req, res, next) => {
    Order.aggregate(
        [
            // First Stage
            {
                $group:
                {
                    _id: "$userId",
                    totalSaleAmount: { $sum: { $multiply: ["$smartphones.quantity", "$smartphones.quantity"] } }
                }
            },])
}
