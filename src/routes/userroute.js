import { Router } from "express";
import UserController from "../controller/usercontroller.js";
import AuthMiddleware from "../middleware/authmiddleware.js";

const router = Router();

router.post("/register", UserController.registerUser);
router.get("/users", AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole, UserController.getAllUsers);
router.post("/login", UserController.loginUser);

export default router;
