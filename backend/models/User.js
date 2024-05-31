import mongoose from "mongoose";

const SchemaThing = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
         type:String,
         unique:true
    },
    password:{
        type:String
    }

})

const UserModel = mongoose.model('User', SchemaThing);

export default UserModel;