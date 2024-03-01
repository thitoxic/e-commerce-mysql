const jwt = require("jsonwebtoken")

function verifyToken(req) {
    const token = req.headers.jwt;
    console.log('token', token)
    if (!token) {
        return { success: false, message: 'No token provided' };
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return { success: true, user };
    } catch (error) {
        return { success: false, message: 'Failed to authenticate token' };
    }
}

module.exports = verifyToken;