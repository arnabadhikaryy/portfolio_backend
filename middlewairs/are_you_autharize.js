import jwt from 'jsonwebtoken';

function are_you_authorized(req, res, next) {
   // console.log('req.body:', req.body.token);

    // 1️⃣ Try to get token from multiple places
    let token =  req.body.token

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "No access token provided."
        });
    }

    try {
        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRITE);

        // 3️⃣ Attach user info to request
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).send({
            status: false,
            message: "Invalid or expired token"
        });
    }
}

export default are_you_authorized;
