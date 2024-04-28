import { Router } from "express";
import { updateUser,deleteUser, getUser, getAllUsers, userStats } from "../controllers/User.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router= Router()

router.put("/update/:id", verifyJWT, updateUser);
router.delete("/delete/:id", verifyJWT, deleteUser);
router.get("/finduser/:id",getUser)
router.get("/",verifyJWT,getAllUsers)
router.get("/stats",userStats)
// router.route("/update").put("/:id",verifyJWT,updateUser)
// router.route("/delete").delete("/:id",verifyJWT,deleteUser)


export default router