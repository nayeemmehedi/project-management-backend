import express from "express"
import { loginUser, loginUserView } from "../controllers/login.controller.js";


const loginRoutes = express.Router();

loginRoutes.post('/login',loginUser)
loginRoutes.post('/loginView',loginUserView)










export { loginRoutes}
