import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import { createList } from "../controllers/List.controller.js";

const router=Router()

router.post("/",verifyJWT,createList)

export default router