import express from "express";
import {
    getRoles,
    getRoleById
} from "../controllers/UsersRole.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/roles/:queryTag/:value1/:value2/:value3/:value4', getRoles);
router.get('/rolebyId/:queryTag/:value1/:value2/:value3/:value4', getRoleById);
// router.get('/search/:queryTag/:value1/:value2/:value3/:value4', getUsersBySearch);

// router.get('/users', verifyUser, adminOnly, getUsers);
// router.get('/users/:id', verifyUser, adminOnly, getUserById);
// router.post('/users', verifyUser, adminOnly, createUser);
// router.patch('/users/:id', verifyUser, adminOnly, updateUser);
// router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;