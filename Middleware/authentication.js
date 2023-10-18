const isAuthorised = (req, res, next) => {
    const token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
        const authToken = token.substring(7);

        const isAuthenticated = authToken === "secerateKey" ? 1 : 0;

        if (isAuthenticated) {
            next();  
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


module.exports = { isAuthorised }