import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    
    // Extract token from "Bearer {token}" format
    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : authHeader;
    
    // Verify token (assuming you're using JWT)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default protect;