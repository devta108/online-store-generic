const express = require('express');
require('dotenv').config()
const app = express();
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// for swagger documentation
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument  = YAML.load('./swagger.yaml');
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))
// regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// Cookies and file middleware
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}))

// morgan middlewware
app.use(morgan('tiny'));

// imports all routes here
const home = require('./routes/home');
const user = require('./routes/user');

const { json } = require('express/lib/response');

// router Middleware
app.use('/api/v1/',home);
app.use('/api/v1/',user);

app.get('/signuptest',(req,res) =>{
    res.render("signuptest")
})
// Module exports
module.exports = app;
