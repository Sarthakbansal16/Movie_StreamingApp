import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import { createList, deleteList, getList } from "../controllers/List.controller.js";

const router=Router()

router.post("/",verifyJWT,createList)
router.delete("/deletelist/:id",verifyJWT,deleteList)
router.get("/",verifyJWT,getList)

export default router