const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;

    try {
        if (!token) {
            return res.status(401).json({ message: "Login first before you proceed" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role 
            };

            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = protect;
