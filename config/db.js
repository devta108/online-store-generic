const mongoose = require('mongoose')

const connectWithDB = () => {
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log(`DB CONNECTED SUCESSFULLY`))
    .catch(error => {
        console.log(`DB CONNCETION ISSUES`)
        console.log(error)
        process.exit(1);
    })
}

module.exports = connectWithDB