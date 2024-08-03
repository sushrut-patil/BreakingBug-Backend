const bcrypt = require('bcrypt');
const Customer = require('../models/customerSchema.js');
const { createNewToken } = require('../utils/token.js');

const customerRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const customer = new Customer({
            ...req.body,
            password: hashedPass
        });

        const existingcustomerByEmail = await Customer.findOne({ email: req.body.email });

        if (existingcustomerByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await customer.save();
            result.password = undefined;
            // console.log(result);
            const token = createNewToken(result._id.toString());
            console.log(token);

            result = {
                ...result._doc, 
                token: token
            };
            // adding the status to the response body
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const customerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let customer = await Customer.findOne({ email: req.body.email });
        // The negation statement here was wrong
        if (customer) {
            const validated = await bcrypt.compare(req.body.password, customer.password);
            // Here also the negation statement is wrong
            if (validated) {
                customer.password = undefined;

                const token = createNewToken(customer._id)

                customer = {
                    ...customer._doc,
                    token: token
                };

                res.send(customer);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getCartDetail = async (req, res) => {
    try {
        // change the method to get id from mongodb
        const {id}= req.params;
        let customer = await Customer.findById(id);
        if (customer) {
            res.send(customer.cartDetails);
        }
        else {
            res.send({ message: "No customer found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// changed method name to shippingDataUpdate

const shippingDataUpdate = async (req, res) => {
    try {
        // Deleted the non mutable propties from req.body
        const userBody = req.body;
        delete userBody._id;
        let customer = await Customer.findByIdAndUpdate(req.params.id, userBody,
            { new: false })

        // Change the method to get shipping data instead of cart data
        return res.send(customer.shippingData);

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    customerRegister,
    customerLogIn,
    getCartDetail,
    shippingDataUpdate,
};
