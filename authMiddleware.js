function authMiddleware(req, res, next){
    const token = req.headers.token;
    if(!token){
        return res.json({
            err: "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(token, jwtPassword);

        
        next();
    } catch(err) {
        return res.status(401).json({
            err: "Invalid Token"
        });
    }
};

module.exports = {
    authMiddleware
}