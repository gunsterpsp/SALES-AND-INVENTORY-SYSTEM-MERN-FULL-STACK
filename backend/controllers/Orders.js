import Item from "../models/ItemModel.js";
import db from "../config/Database.js";

export const createOrder = async(req, res) =>{
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
