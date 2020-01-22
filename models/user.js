var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
    
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Mobile:{
        type:Number,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }

});

var users = mongoose.model('users', userSchema);

module.exports=users;

