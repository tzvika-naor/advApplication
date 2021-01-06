const Smartphone = require('../models/smartphone');
exports.getSmartphones = (req, res, next) => {
    const SmartphoneQuery = Smartphone.find();//return all the Smartphone
    SmartphoneQuery.then(documents => {
        console.log(documents);
        fetchedSmartphones = documents;
        brand = fetchedSmartphones.map((Smartphone) => {
            return Smartphone.brand
        })
        uniqBrands = [...new Set(brand)]; //this is the same as group by
        return Smartphone.countDocuments() // returns all the number of that match query from this database... we made no filtering so we got all 100 cars
    }).then(count => {
        // console.log(count)
        res.status(200).json({
            message: 'Smartphone fetch succesfully!',
            smartphones: fetchedSmartphones,
            brand: uniqBrands,
            maxSmartphones: count
        })
    })

}
exports.getSmartphone = (req, res, next) => {
    console.log(req.params.id)
    Smartphone.findById(req.params.id).then(document => {
        console.log(document)
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
    console.log(req.body);
    const Smartphone = new Smartphone({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image
    });
    console.log(Smartphone)
    Smartphone.save().then(newSmartphone => {
        res.status(201).json({
            message: "Smartphone added successfully",
            Smartphone: {
                title: newSmartphone.title,
                price: newSmartphone.price,
                description: newSmartphone.description,
                category: newSmartphone.category,
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
    console.log(req.params.id)
    // console.log(req.body)
    const Smartphone = new Smartphone({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    });
    Smartphone._id = req.params.id;
    Smartphone.updateOne({ _id: req.params.id }, Smartphone).then(result => {
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
    console.log(req.params.id)
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