const onlyAdmin = (req, res, next) => {

    const { role } = req.user;

    if("ADMIN" !== role) res.status(401).json({message: 'not authorized'});

    next()

};

const checkRoles = (roles) => {

    return (req, res, next) => {

        if(!roles.includes(req.user.role)) return res.status(401).json({message: 'unauthorized'});

        next();

    };
};

module.exports = {
    onlyAdmin,
    checkRoles
}