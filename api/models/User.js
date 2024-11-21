const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    googleId:{type:String,allowNull:true}

})

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;