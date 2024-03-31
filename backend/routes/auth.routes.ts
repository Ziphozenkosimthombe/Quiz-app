import { Router} from "express";
import {SignupAuthController, LoginAuthController, LogoutAuthController} from '../controllers/auth.controllers';


const route = Router();

route.post('/signup', SignupAuthController.signup);
route.post('/login', LoginAuthController.login);
route.post('/logout', LogoutAuthController.logout);

export default route;