const authorizeUser = (permittedRoles) => {
    return (req, res, next) => {
        if (permittedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(400).json('You don\'t have permission to do this.');
        }
    };
};

module.exports = authorizeUser;
