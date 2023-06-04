const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const session = require("express-session")
const nocache = require("nocache")

const connectDB = require('./server/database/connection');

const app = express();



const PORT = 3000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

app.use(nocache())

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// session

app.use(session({
    secret:"mySecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:288000,
        secure:false,
        httpOnly:true
    }
}))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});