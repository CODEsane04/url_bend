const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.JWT_SECRET;

function setUser(user) {

    console.log("entered set user");
    console.log(user);

    const payload = {
        _id : user._id,
        email: user.email,
    }
    return jwt.sign(payload, secret, {
        expiresIn: '1h'
    });
}

function getUser(token) {
    if (!token) {
        return null;
    }
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser
}