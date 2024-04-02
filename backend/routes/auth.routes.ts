import { Router} from "express";
import {SignupAuthController,
    LoginAuthController,
    LogoutAuthController,
    GetAuthLogin,
    GetAuthSignup,
} 
    from '../controllers/auth.controllers';


const route = Router();

route.get('/signup', GetAuthSignup.getSignup);
route.get('/login', GetAuthLogin.getLogin);
route.get('/logout', LogoutAuthController.logout);
route.post('/signup', SignupAuthController.signup);
route.post('/login', LoginAuthController.login);


const authRoute = route;
export default authRoute;