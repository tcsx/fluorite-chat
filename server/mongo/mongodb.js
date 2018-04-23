let mongoose = require("mongoose");
let DB_URL = 'mongodb://root:123@ds153869.mlab.com:53869/chat'
mongoose.connect(DB_URL,{useMongoClient:true});

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