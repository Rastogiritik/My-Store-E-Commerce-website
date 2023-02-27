const mongoose = require('mongoose');


const connectDatabase = ()=>{
mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    // userUnifiedTopology: true,
    // useCreateIndex: true
}).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
})
}


module.exports= connectDatabase 