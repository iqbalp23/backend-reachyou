import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js"
import AuthRoute from "./routes/AuthRoute.js"
import ArticleRoute from "./routes/ArticleRoute.js";
import helmet from "helmet";
import fileUpload from "express-fileupload";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db :db
});

// (async()=>{
//     await db.sync();
// })();
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized :true,
    store: store,
    cookie :{
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: "*",
}));
app.use(express.json());
app.use(helmet());
app.use("/public", express.static(`./public`));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(fileUpload());
app.use(UserRoute);
app.use(AuthRoute);
app.use('/article', ArticleRoute);

store.sync();

const port = process.env.APP_PORT || 8000

app.listen(port, ()=> {
    console.log(`Server up and running in port ${port}`);
});
