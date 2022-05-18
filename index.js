const app = require("./app");
const connectWithDB = require("./config/db");
require('dotenv').config()
const PORT = process.env.PORT;
const cloudinary = require('cloudinary')

// connect With DB  
connectWithDB()

// cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// temp check
 app.set("view engine","ejs");


app.get("/",(req,res) => {
    res.status(200).send("<h1>This is homepage</h1>")
})

app.listen(PORT,() => console.log(`App is listining to http://localhost:${PORT}`));