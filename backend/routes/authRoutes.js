import express from 'express'
import { LoginController, RegisterController, getProfile, test } from '../controllers/authControllers.js';



const router = express.Router();


router.get('/', test )
router.post('/register', RegisterController)
router.post('/login',LoginController)
router.get('/profile', getProfile)


export default router;