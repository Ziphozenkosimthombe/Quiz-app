import { Router } from "express";
const router = Router();

import { HomeController } from "../controllers/home.controllers";

router.get('/', HomeController.getHome);

const homeRoute = router;
export default homeRoute;