import UserModel from "../models/User.js";
import nodemailer from 'nodemailer';
import { hashPassword, comparePassword } from "../utils/auth.js";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv'
import { generateOtp } from "../services/GenerateOtp.js";
dotenv.config()


// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD
  },
  debug: true, 
  logger: true 
});

console.log({   
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_MAIL,
  pass: process.env.SMTP_PASSWORD
});


// Just for test purpose 
export const test = async(req, res) => {
    res.json('Test is working');
}

export const RegisterController = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Registering user with email:', email, 'and name:', name);

        // Validation for email 
        const emailExist = await UserModel.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        const hashedPassword = await hashPassword(password); // Assuming hashPassword is asynchronous
        // Creating user data
        const user = await UserModel.create({
            name, email, password: hashedPassword
        });

        // sending  OTP
        const otp  = generateOtp() 


        // Send email
        const mailOptions = {
          from: process.env.SMTP_MAIL,
          to: email,
          subject: "Otp from yogesh coding ",
          text:`Your otp is ${otp}`,
        };

        transporter.sendMail(mailOptions, function(err, info) {
          if (err) {
            console.log('Error while sending email:', err);
          } else {
            console.log("Email sent successfully!", info.response);
          }
        });

        return res.status(201).json({ msg: "User created", user });

    } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ success: false, msg: "Error while creating data" });
    }
};

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
};

export const getProfile = async(req, res) => {
    const { token } = req.cookies;
    if (token) {
        JWT.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};
