const express = require("express")
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRouter');
const userRoutes = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { restrictLoggedInUserOnly } = require('./middleware/authMiddleware');

const mongo_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;
//connect to mongoDb
mongoose.connect(mongo_URI)
    .then(()=> {
        console.log("connected to mongoDB");
        app.listen(PORT, ()=> {
            console.log(`listening to http://localhost:${PORT}`);
        })
    })
    .catch((err)=> {
        console.log("error connecting to mongoDB", err);
    })

//middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/', urlRoutes);
app.use('/user', userRoutes);
