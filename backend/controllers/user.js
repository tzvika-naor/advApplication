
const User = require('../models/user');

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
    let fetchUser
    User.findOne({ email: req.body.email })
        .then(user => { //get back the object from the database
            if (!user) {
                res.status(401).json({
                    message: "failed to log in user does not exist"
                });
            }
            else {
                res.status(200).json({
                    user: user,
                    message: "succeed logging in",
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'somthing went wrong!'
            });
        });
}