const mongoose = require("mongoose");
const DB_URL = process.env.MONGODB || require('./key');
mongoose.connect(DB_URL);

/**
  * link success
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * link abmornal
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * link disconnect
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 
module.exports = mongoose;