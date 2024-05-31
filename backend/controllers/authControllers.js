import UserModel from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import JWT from 'jsonwebtoken'


// Just for test purpose 
export const test = async( req, res)=>{
    res.json('Test is working ')
}



export const RegisterController = async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        // Validation for  email 
        const emailExist = await UserModel.findOne({email});
        if(emailExist){
            return res.json({error:"Email is already taken"})
        }

        const hashedPassword = hashPassword(password);
        //Creatign data of user

        const user = await UserModel.create({
            name, email, password:hashedPassword
        })
     return res.status(201).json({msg:"user created", user});

    }catch (error) {
        console.log("Error creating user");
        res.status(404).json({sucess:false, msg:"Error while creating datab "})
    }
}


export const LoginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid email", success: false });
      }
      // Compare the password
      const matchPassword = await comparePassword(password, user.password);
      if (matchPassword) {
        // Sign a JWT token
        JWT.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Error while generating token", success: false });
          }
         
          res.cookie('token', token).json(user);
        });
      } else {
        // Incorrect password
        return res.status(401).json({ msg: "Invalid email or password", success: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error while logging in", success: false });
    }
  }
  



export const getProfile = async(req,res)=>{
  const {token} = req.cookies
  if(token){
    JWT.verify(token, process.env.JWT_SECRET, {}, (err, user)=>{
      if(err) throw err;
      res.json(user)
    })
  }else{
    res.json(null)
  }

}