
const user = require('../models/user');
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
    console.log(req.body)
    const user = new User({
        isAdmin: req.body.isAdmin,
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
                    isAdmin: newUser.isAdmin,
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
// update user
exports.updateUser = (req, res, next) => {
    console.log(req.body)
    //get the document by id
    User.findOne({ email: req.body.email }).then(document => {  //get back the object from the database
        if (document) {
            //update the password
            document.password = req.body.password
            User.updateOne({ _id: document._id }, document).then(doc => {
                res.status(200).json({
                    user: doc,
                    message: "user password updated"
                })
            })
        }
    })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'somthing went wrong!'
            });
        });
}

exports.deleteUser = async (req, res, next) => {
    console.log(req.body.email)
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    console.log(user)
    if (user) {
        User.deleteOne({ _id: user._id }).then(result => {
            if (result.n > 0) {
                res.status(200).json({
                    message: "Deletion successful!"
                })
            }
            else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
            .catch(error => {
                res.status(500).json({
                    message: "Somthing went wrong!",
                    error: error
                });
            });

    }
    else {
        res.status(401).json({ message: "Not authorized!" });
    }
}


exports.deleteUserByAdmin = (req, res, next) => {
    console.log(req.params)
    User.deleteOne({ _id: req.params.id }).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "Deletion successful!"
            })
        }
        else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Somthing went wrong!",
                error: error
            });
        });
}
