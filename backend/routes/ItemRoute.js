import express from "express";
import {
    getItems,
    createItem,
    updateItemInfo,
    activeItem,
    lockItem
} from "../controllers/Items.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/items/:queryTag/:value1/:value2/:value3/:value4', getItems);
router.post('/items', createItem);
router.patch('/items/:item_id', updateItemInfo);
// router.delete('/customers/:customer_id', deleteCustomer);
router.patch('/items/active/:item_id', activeItem);
router.patch('/items/lock/:item_id', lockItem);



// router.get('/users/:uuid', getUserById);
// router.post('/users', createUser);
// router.patch('/users/:uuid', updateUser);
// router.delete('/users/:uuid', deleteUser);
// router.patch('/users/active/:uuid', activeUser);
// router.patch('/users/lock/:uuid', lockUser);
// router.patch('/changeUserPassword/:uuid', updateUserPassword);
// router.patch('/changeInfo/:uuid', updateUserInfo);
// router.get('/search/:queryTag/:value1/:value2/:value3/:value4', getUsersBySearch);

// router.get('/users', verifyUser, adminOnly, getUsers);
// router.get('/users/:id', verifyUser, adminOnly, getUserById);
// router.post('/users', verifyUser, adminOnly, createUser);
// router.patch('/users/:id', verifyUser, adminOnly, updateUser);
// router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;