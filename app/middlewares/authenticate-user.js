const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    try {
        const tokenData = jwt.verify(token, process.env.SECRETKEY);
        //console.log(tokenData.id)
        req.user = {
            id: tokenData.id,
            role: tokenData.role
        };
        next(); // Proceed to the next middleware
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
};

module.exports = authenticateUser;
