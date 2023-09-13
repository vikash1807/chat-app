import jwt from "jsonwebtoken";

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return response.status(401).json('token is missing');
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json('invalid token');
        }
        request.user = user;
        next();
    })
}