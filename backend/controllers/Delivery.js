import Delivery from "../models/DeliveryModel.js";
import db from "../config/Database.js";



export const getDelivery = async(req, res) =>{

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


