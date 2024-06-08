import express from 'express'
import { LoginController, RegisterController, getProfile, test } from '../controllers/authControllers.js';
import { loginValidator, registerValidator,  validate } from '../validations/Express-Validator.js';



const router = express.Router();


router.get('/', test )
router.post('/register', registerValidator(), validate,  RegisterController)
router.post('/login', loginValidator(), validate, LoginController)
router.get('/profile', getProfile)


export default router;