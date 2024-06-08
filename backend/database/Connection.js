import mongoose from "mongoose";


const Connection = async()=>{

    mongoose.connect(process.env.MANGO_URL).then(()=>{
        console.log("COnnected sucessfully to db")
    }).catch((err)=>{
        console.log(err, "Error conencting to db")
    })
}

export default Connection;

