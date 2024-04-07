import { Router } from "express";
const router = Router();

import { HomeController, GetHome } from "../controllers/home.controllers";

router.get('/', HomeController.getHome);
router.get('/home',GetHome.getHome );

const homeRoute = router;
export default homeRoute;