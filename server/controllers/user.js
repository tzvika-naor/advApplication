
const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    const fetchUsers = User.find();
    fetchUsers.then(documents => {
        res.status(200).json({
            message: "users fetch successfuly",
            user: documents
        })
    }).catch(error => {
        res.status(500).json({
            message: 'user fetching failed!',
            error: error
        })
    })
}
exports.createUser = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone
    });
    user.save()
        .then(newUser => {
            console.log(newUser)
            res.status(201).json({
                message: "user created successfully",
                user: {
                    email: newUser.email,
                    password: newUser.password,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    phone: newUser.phone
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'user creation failed!',
                error: err
            });
        });
}

exports.userLogin = (req, res, next) => {

    User.findOne({ email: req.body.email, password: req.body.password })
        .then(documents => { //get back the object from the database
            if (documents) {
                res.status(200).json({
                    user: documents,
                    message: "succeed logging in"
                })
            }
            else if (!documents) {
                res.status(401).json({
                    user: documents,
                    message: "failed to login user does not exist"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'somthing went wrong!'
            });
        });
}