import Order from "../models/OrderModel.js";
import db from "../config/Database.js";



export const getOrders = async(req, res) =>{

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

export const createOrder = async(req, res) =>{

    const {item_uuid, item_code, item_name, quantity, price, item_id, customer_id} = req.body;
        const session = req.session.userId;

        try {
        await Order.bulkCreate([{
            item_uuid: item_uuid,
            item_code: item_code,
            item_name: item_name,
            quantity: quantity,
            price: price,
            item_status: 1, 
            item_id: item_id,
            customer_id: customer_id,
            user_uuid: session
        }]);
        res.json({item_code, item_name, session});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    



    // for (let i = 0; i < count.length; i++) {
    //     const element = count[i];


    // }

    // const {item_code, item_name, quantity, price, item_id} = req.body;
    // const session = req.session.userId;
    // const sql = `INSERT INTO orders (item_code, item_name, quantity, price, item_status, item_id) VALUES ('${req.body.item_code}', '${req.body.item_name}', '${req.body.quantity}', '${req.body.price}','1', '${req.body.item_id}')`

    // db.query(sql, (err, data) => {
    //         try {
    //             res.json("added")
    //         } catch (err) {
    //             console.log(err)
    //         }
    // })

    // try {
    //     await Order.create({
    //         item_code: item_code,
    //         item_name: item_name,
    //         quantity: quantity,
    //         price: price,
    //         item_status: 1, 
    //         item_id: item_id,
    //         user_uuid: session
    //     });
    //     res.json({item_code, item_name, session});
    // } catch (error) {
    //     res.status(400).json({msg: error.message});
    // }

    

    // const oBody = [
    //     {
    //         item_code: item_code,
    //         item_name: item_name,
    //         quantity: quantity,
    //         price: price,
    //         item_id: item_id
    //     }
    // ]
    // const array = []

    // for (let i = 0; i < oBody.length; i++) {
    //     const element = oBody[i];
    //     res.status(201).json({
    //         message: element.item_code
    //     })
    // }



    // const status = 1;
    // const session = req.session.userId;

    // await Order.bulkCreate([
    //     {
    //         item_code: item_code,
    //         item_name: item_name,
    //         quantity: quantity,
    //         price: price,
    //         item_id: item_id,
    //         item_status: status,
    //         user_id: session
    //     }
    // ])

}
