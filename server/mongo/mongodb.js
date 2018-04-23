let mongoose = require("mongoose");
let DB_URL = 'mongodb://chat:chat@ds255539.mlab.com:55539/chat'
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