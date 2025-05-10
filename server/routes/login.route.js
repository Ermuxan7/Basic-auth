import { Router } from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "../controllers/auth.controller.js";
import { protectedMiddleware } from "../middleware/protected.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", protectedMiddleware, getUser);

export default router;
