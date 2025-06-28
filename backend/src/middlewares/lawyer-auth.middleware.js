import jwt from "jsonwebtoken";

export const lawyerMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) return res.status(401).json({ message: "Access token missing" });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_LAWYER);
        console.log(decoded);
        if (!decoded || !decoded._id) return res.status(403).json({ message: "Invalid token" });

        req.userId = decoded._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};
