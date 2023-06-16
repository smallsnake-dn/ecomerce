import { Router } from "express";
import { routerAccess } from "./access";

import {apiKey, checkPermission} from "../auth/checkAuth"

export const router = Router();

// check api key
// router.use(apiKey)

// check permission

// router.use(checkPermission("0000"))





router.use("/v1/api", routerAccess)