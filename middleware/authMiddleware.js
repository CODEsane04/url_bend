const {getUser} = require('../service/authService');

function restrictLoggedInUserOnly (req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({message: "unauthorized, please login"});
    }

    try {
        const user = getUser(token);
        
        //if user is found, attach it to the request object
        req.user = user;
        next();

    } catch (error) {

        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

}

module.exports = {
    restrictLoggedInUserOnly,
}