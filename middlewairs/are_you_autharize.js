import jwt from 'jsonwebtoken';

function are_you_authorized(req, res, next) {
    const token = req.body.token;

    if (!token) {
        return res.send({ status: false, message: "Sorry ! you have no Access Token!!!! from server" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRITE); 
        // return res.json({
        //     login: true,
        //     data: decoded
        // });
        if(decoded.name === 'Arnab Adhikary'){
            console.log('authorized person')
            next();
        }
        else{
            res.send({status:false,message:"you are different person or somthing wrong"})
        }
    } catch (err) {
        return res.send({status:false, login: false, message: "Invalid token", error: err.message });
    }
}

export default are_you_authorized;
