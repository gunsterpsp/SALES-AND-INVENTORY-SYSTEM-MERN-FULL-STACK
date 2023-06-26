import Customer from "../models/CustomerModel.js";
import db from "../config/Database.js";

export const getCustomers = async(req, res) =>{

    const {queryTag, value1, value2, value3, value4 } = req.params;

    const queryParams = `@queryTag=${queryTag}, @value1=${value1}, 
    @value2=${value2}, @value3=${value3}, @value4=${value4}`
    await db.query(`EXEC spApp ${queryParams}`).then(result => {
        if (result)
        {
            return res.json(result);
        }else {
            return console.error
        }
    })
}

export const createCustomer = async(req, res) =>{
    const {customer_code, customer_name} = req.body;
    const status = 1;
    const session = req.session.userId;

    try {
        await Customer.create({
            customer_code: customer_code,
            customer_name: customer_name,
            customer_status: status, 
            user_uuid: session
        });
        res.json({customer_code, customer_name, status, session});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateCustomerInfo = async(req, res) =>{
    const customer = await Customer.findOne({
        where: {
            customer_id: req.params.customer_id
        }
    });
    if(!customer) return res.status(404).json({msg: "Customer not found!"});
    const {customer_code, customer_name} = req.body;
    try {
        await Customer.update({
            customer_code: customer_code,
            customer_name: customer_name
        },{
            where:{
                customer_id: customer.customer_id
            }
        });
        res.status(200).json({msg: "Customer Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteCustomer = async(req, res) =>{
    const customer = await Customer.findOne({
        where: {
            customer_id: req.params.customer_id
        }
    });
    if(!customer) return res.status(404).json({msg: "Customer not found!"});
    try {
        await Customer.destroy({
            where:{
                customer_id: customer.customer_id
            }
        });
        res.status(200).json({msg: "Customer Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}



export const activeCustomer = async(req, res) =>{
    const customer = await Customer.findOne({
        where: {
            customer_id: req.params.customer_id
        }
    });
    if(!customer) return res.status(404).json({msg: "Customer not found!"});
    try {
        await Customer.update({
            customer_status: 1
        },{
            where:{
                customer_id: customer.customer_id
            }
        });
        res.status(200).json({msg: "Customer Activate!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const lockCustomer = async(req, res) =>{
    const customer = await Customer.findOne({
        where: {
            customer_id: req.params.customer_id
        }
    });
    if(!customer) return res.status(404).json({msg: "Customer not found!"});
    try {
        await Customer.update({
            customer_status: 2
        },{
            where:{
                customer_id: customer.customer_id
            }
        });
        res.status(200).json({msg: "Customer Locked!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}



// export const getUserById = async(req, res) =>{
//     try {
//         const response = await User.findOne({
//             attributes:['uuid','firstname','lastname','username','password','email','role','status'],
//             where: {
//                 uuid: req.params.uuid
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }
