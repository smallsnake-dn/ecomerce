import { Router } from "express";
import accessController from "../../controllers/access.controller";
import {asyncHandler} from "../../auth/checkAuth"
import { authentication } from "../../auth/authUtils";

export const routerAccess = Router();


// router for signUp new 
routerAccess.post("/shop/signup", asyncHandler(accessController.signUp))
routerAccess.post("/shop/login", asyncHandler(accessController.login))


routerAccess.use(authentication)
// authentication
routerAccess.post("/shop/logout", asyncHandler(accessController.logout))