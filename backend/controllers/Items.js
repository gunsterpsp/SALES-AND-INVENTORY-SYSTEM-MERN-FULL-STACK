import Item from "../models/ItemModel.js";
import db from "../config/Database.js";

export const getItems = async(req, res) =>{

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

export const createItem = async(req, res) =>{
    const {item_code, item_name, item_quantity} = req.body;
    const status = 1;
    const session = req.session.userId;

    try {
        await Item.create({
            item_code: item_code,
            item_name: item_name,
            item_quantity: item_quantity,
            item_status: status, 
            user_uuid: session
        });
        res.json({item_code, item_name, status, session});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateItemInfo = async(req, res) =>{
    const item = await Item.findOne({
        where: {
            item_id: req.params.item_id
        }
    });
    if(!item) return res.status(404).json({msg: "Item not found!"});
    const {item_code, item_name} = req.body;
    try {
        await Item.update({
            item_code: item_code,
            item_name: item_name
        },{
            where:{
                item_id: item.item_id
            }
        });
        res.status(200).json({msg: "Item Updated"});
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



export const activeItem = async(req, res) =>{
    const item = await Item.findOne({
        where: {
            item_id: req.params.item_id
        }
    });
    if(!item) return res.status(404).json({msg: "Item not found!"});
    try {
        await Item.update({
            item_status: 1
        },{
            where:{
                item_id: item.item_id
            }
        });
        res.status(200).json({msg: "Item Activate!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const lockItem = async(req, res) =>{
    const item = await Item.findOne({
        where: {
            item_id: req.params.item_id
        }
    });
    if(!item) return res.status(404).json({msg: "Item not found!"});
    try {
        await Item.update({
            item_status: 2
        },{
            where:{
                item_id: item.item_id
            }
        });
        res.status(200).json({msg: "Item Locked!"});
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
