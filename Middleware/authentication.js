const isAuthorised = (req, res, next) => {
    const token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
        const authToken = token.substring(7);

        const secureKey = "secerateKey";
        
        // Use a strict comparison (===) to check the validity of the token
        if (authToken === secureKey) {
            next();  
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { isAuthorised };
