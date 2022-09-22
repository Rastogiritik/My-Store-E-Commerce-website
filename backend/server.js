const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// Handle the Uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1)
})

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });


// connecting to databse
connectDatabase();

const server =  app.listen(process.env.PORT,()=>{
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode. `)
})

// Handle Unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1)
    })
})