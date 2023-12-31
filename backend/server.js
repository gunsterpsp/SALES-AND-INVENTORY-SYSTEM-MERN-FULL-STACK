import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
// import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoleRoute from "./routes/UserRoleRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
import ItemRoute from "./routes/ItemRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import DeliveryRoute from "./routes/DeliveryRoute.js";
// import OrderModel from "./models/OrderModel.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: 'djalsdkjalsdkiouoiudas1239048723098',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
// app.use(ProductRoute);
app.use(AuthRoute);
app.use(UserRoleRoute);
app.use(CustomerRoute);
app.use(ItemRoute);
app.use(OrderRoute);
app.use(DeliveryRoute);
// app.use(OrderModel);
// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running on port', process.env.APP_PORT);
});
