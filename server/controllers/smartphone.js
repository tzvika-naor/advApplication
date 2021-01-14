const Smartphone = require('../models/smartphone');
exports.searchQuery = (req, res, next) => {
    console.log(req.body)
    Smartphone.find({
        brand: req.body.brand, $or: [{ display: { $gt: req.body.display } }, { batteryCapacity: { $gt: req.body.batteryCapacity } }],
    }).then(documents => {
        res.status(200).json({
            message: 'query succeeded',
            smartphone: documents
        })
    })
        .catch((err) => {
            res.status(500).json({
                message: 'something went wrong ',
                error: err
            })
        })
}
exports.getSmartphones = (req, res, next) => {
    const SmartphoneQuery = Smartphone.find();//return all the Smartphone
    SmartphoneQuery.then(documents => {
        fetchedSmartphones = documents;
        brand = [...new Set(fetchedSmartphones.map(Smartphone => Smartphone.brand))].sort()
        display = [...new Set(fetchedSmartphones.map(Smartphone => Smartphone.display))].sort()
        batteryCapacity = [...new Set(fetchedSmartphones.map(Smartphone => Smartphone.batteryCapacity))].sort()
        processor = [...new Set(fetchedSmartphones.map(Smartphone => Smartphone.processor))].sort()
        frontCamera = [...new Set(fetchedSmartphones.map(Smartphone => Smartphone.frontCamera))].sort()
        rearCamera = [...new Set(fetchedSmartphones.map(Smartphone => Smartphone.rearCamera))].sort()
        phoneModel = [...new Set(fetchedSmartphones.map(Smartphone => Smartphone.phoneModel))].sort()
        return Smartphone.countDocuments() // returns all the number of that match query from this database... we made no filtering so we got all 100 cars
    }).then(count => {
        res.status(200).json({
            message: 'Smartphone fetch succesfully!',
            smartphones: fetchedSmartphones,
            unique: {
                brand: brand,
                display: display,
                batteryCapacity: batteryCapacity,
                processor: processor,
                frontCamera: frontCamera,
                rearCamera: rearCamera,
                phoneModel: phoneModel
            },
            maxSmartphones: count
        })
    })

}
exports.getSmartphone = (req, res, next) => {
    Smartphone.findById(req.params.id).then(document => {
        if (document) {
            res.status(200).json({
                message: 'fetching succeeded',
                Smartphones: document
            })
        } else {
            res.status(404).json({ message: 'Smartphone not found!' });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!',
            error: error
        });
    });
};

exports.createSmartphone = (req, res, next) => {
    const smartphone = new Smartphone({
        phoneModel: req.body.phoneModel,
        brand: req.body.brand,
        display: req.body.display,
        processor: req.body.processor,
        frontCamera: req.body.frontCamera,
        rearCamera: req.body.rearCamera,
        batteryCapacity: req.body.batteryCapacity,
        price: req.body.price,
        image: req.body.image
    });
    smartphone.save().then(newSmartphone => {
        res.status(201).json({
            message: "Smartphone added successfully",
            Smartphone: {
                phoneModel: newSmartphone.phoneModel,
                brand: newSmartphone.brand,
                display: newSmartphone.display,
                processor: newSmartphone.processor,
                frontCamera: newSmartphone.frontCamera,
                rearCamera: newSmartphone.rearCamera,
                batteryCapacity: newSmartphone.batteryCapacity,
                price: newSmartphone.price,
                image: newSmartphone.image
            }
        });
    })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a Smartphone failed!',
                // error: error
            });
        });
};
exports.updateSmartphone = (req, res, next) => {
    const smartphone = new Smartphone({
        phoneModel: req.body.phoneModel,
        brand: req.body.brand,
        display: req.body.display,
        processor: req.body.processor,
        frontCamera: req.body.frontCamera,
        rearCamera: req.body.rearCamera,
        batteryCapacity: req.body.batteryCapacity,
        price: req.body.price,
        image: req.body.image
    });
    smartphone._id = req.params.id;
    Smartphone.updateOne({ _id: req.params.id }, smartphone).then(result => {
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
exports.deleteSmartphone = (req, res, next) => {
    Smartphone.deleteOne({ _id: req.params.id }).then(result => {
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
    // exports.searchQuery = (req, res, next) => {
    //     console.log(req.body);
    //     var minPrice = '';
    //     var reviews = parseInt(req.body.reviews.substring(1,2));
    //     const tmpMinPrice = req.body.minPrice;
    //     if (tmpMinPrice.substring(1) === '+')
    //         minPrice = tmpMinPrice.substring(0, 1);
    //     if (tmpMinPrice.substring(2) === '+')
    //         minPrice = tmpMinPrice.substring(0, 2);
    //     if (tmpMinPrice.substring(3) === '+'){
    //         minPrice = tmpMinPrice.substring(0, 3);
    //     }
    //     minPrice = parseInt(minPrice);

    //     Smartphone.find({
    //         category: req.body.category, price: { $gt: minPrice }, reviews: { $gt: reviews },
    //     }).sort({ price: req.body.orderBy }).then(documents => {
    //             res.status(200).json({
    //                 message: 'query succeeded',
    //                 Smartphones: documents
    //             })
    //         })
    //         .catch((err) => {
    //             res.status(500).json({
    //                 message: 'something went wrong ',
    //                 error: err
    //             })
    //         })
    // }
    // exports.getCategory = (req, res, next) => {
    //     const SmartphoneQuery = Smartphone.find();//return all the Smartphone
    //     SmartphoneQuery.then(documents => {
    //         fetchedSmartphones = documents;
    //         categories = fetchedSmartphones.map((Smartphone) => {
    //             return Smartphone.category
    //         })
    //         uniqCategories = [...new Set(categories)]; //this is the same as group by
    //         return Smartphone.countDocuments() // returns all the number of that match query from this database... we made no filtering so we got all 100 cars
    //     }).then(count => {
    //         // console.log(count)
    //         res.status(200).json({
    //             message: 'Smartphone fetch succesfully!',
    //             category: uniqCategories
    //         })
    //     })

    // }
    // exports.getReviews = (req, res, next) => {
    //     const SmartphoneQuery = Smartphone.find();//return all the Smartphone
    //     SmartphoneQuery.then(documents => {
    //         console.log(documents)
    //         fetchedSmartphones = documents;
    //         reviews = fetchedSmartphones.map((Smartphone) => {
    //             return Smartphone.reviews
    //         })
    //         uniqueReviews = [...new Set(reviews)]; //this is the same as group by
    //         sortedReviews = uniqueReviews.sort(function (a, b) {
    //             return a - b;
    //         });
    //     }).then(count => {
    //         // console.log(count)
    //         res.status(200).json({
    //             message: 'Smartphone fetch succesfully!',
    //             reviews: sortedReviews,
    //             notUnique: reviews
    //         })
    //     })
    // }