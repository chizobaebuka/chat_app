import jwt from 'jsonwebtoken';
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    res.cookie('jwt', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevents XSS cross site scripting,
        sameSite: "strict", // CSRF Attacks,,
        secure: process.env.NODE_ENV !== "development" // HTTPS
    });
    return token;
};
export default generateToken;
