import jwt from "jsonwebtoken";

export const userMiddleware = (req, res, next) => {
    try {
        let token = req.cookies?.accessToken;

        // Fallback to Authorization header if no token in cookies
        if ((!token || token === "undefined") && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            } else {
                token = authHeader;
            }
        }

        if (!token || token === "undefined") {
            return res.status(401).json({ message: "Access token missing" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_USER);

        if (!decoded?.['_id']) {
            return res.status(403).json({ message: "Invalid token payload" });
        }

        req.userId = decoded._id;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};
