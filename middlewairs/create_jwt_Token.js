import jwt from 'jsonwebtoken'; // corrected import
import basicmodel from '../models/basic_schema.js';

async function create_jwt_token_login(req, res) {
    const { _id } = req.body; // destructure _id from body

    if (!_id) {
        res.send({ status: false, message: 'Please provide _id' });
        return;
    }

    if(_id.length != 24){
        res.send({ status: false, message: '_id length must be 24' });
        return;
    }

    try {
        let response = await basicmodel.findOne({ _id });

        if (response) {
            const token = jwt.sign(
                { name: response.my_name,
                    DOB:response.date_of_barth,
                    address:response.address,
                    email:response.email
                 }, // payload
                process.env.JWT_SECRITE, // secret key
                { expiresIn: 60 * 60 * 24} // 1 day
            );
            response = 'undifined';

            console.log(token);
            res.cookie('token', token);
            res.send({status:true,message:'token ganerated succesfully',token:token})
        } else {
            res.send({ status: false, message: 'User not found, token not generated' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: 'Server error' });
    }
}

export default create_jwt_token_login;
