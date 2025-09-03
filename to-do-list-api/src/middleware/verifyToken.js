const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({
            success: false,
            error: 'Access token required. Please provide a valid Bearer token.'
        });
    }
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            let errorMessage = 'Invalid token';

            if(err.name === 'TokenExpiredError'){
                errorMessage = 'Token has expired';
            } else if(err.name === 'JsonWebTokenError') {
                errorMessage = 'Invalid token format';
            } else if (err.name === 'NotBeforeError') {
                errorMessage = 'Token not active yet';
            }

            return res.status(401).json({
                success: false,
                error: errorMessage
            });
        }

        req.user = decode;
        next();
    });
};

module.exports = { verifyToken }