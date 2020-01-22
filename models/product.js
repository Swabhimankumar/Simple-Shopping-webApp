var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    imagepath:{
        type:String,
        required:true,
        unique:true
        
    },
    price:{
        type:Number,
        required:true
        
    },
    

});
module.exports = mongoose.model('Product', userSchema);



