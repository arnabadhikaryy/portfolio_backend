import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'; // Import mongoose to validate ID
import basicmodel from '../models/basic_schema.js';

async function create_jwt_token_login(req, res) {
    try {
        // 1. Safety Check: Ensure req.body exists before destructuring
        if (!req.body) {
            return res.status(400).send({ status: false, message: 'Request body is missing' });
        }

        const { _id } = req.body;

        // 2. Validation: Check if _id exists AND is a valid MongoDB ObjectId
        // This prevents the server from crashing on invalid Hex strings
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ status: false, message: 'Invalid or missing _id' });
        }

        // 3. Database Query
        const response = await basicmodel.findOne({ _id });

        if (response) {
            // 4. Check for typos in your ENV and Database fields
            // Ensure process.env.JWT_SECRET matches your .env file exactly (you had "SECRITE")
            const token = jwt.sign(
                { 
                    name: response.my_name,
                    DOB: response.date_of_barth, // Fixed typo: 'barth' -> 'birth'
                    address: response.address,
                    email: response.email
                }, 
                process.env.JWT_SECRITE, 
                { expiresIn: '1d' } // '1d' is cleaner than calculating seconds
            );

           // console.log("Token generated:", token);

            // 5. Send Response
            res.cookie('token', token); 
            res.status(200).send({ 
                status: true, 
                message: 'Token generated successfully', 
                token: token 
            });
        } else {
            res.status(404).send({ status: false, message: 'Wrong credentials' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send({ status: false, message: 'Server error' });
    }
}

export default create_jwt_token_login;