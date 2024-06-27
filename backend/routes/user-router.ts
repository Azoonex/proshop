import express from "express";
import * as authController from "../controllers/auth-controller";
import * as userController from "../controllers/user-controller";
import * as auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.post("/register", catchAsync(authController.register));
router.post("/auth", catchAsync(authController.login));
router.post("/logout", catchAsync(authController.logout));

/////////////////// Private
router.use(catchAsync(auth.protect));

router
  .route("/profile")
  .get(catchAsync(userController.getUserProfile))
  .patch(catchAsync(userController.updateUserProfile));

/////////////////// Admin
router.use(catchAsync(auth.admin));

router.get("/", catchAsync(userController.getAllUsers));

router
  .route("/:id")
  .get(catchAsync(userController.getUser))
  .patch(catchAsync(userController.updateUser))
  .delete(catchAsync(userController.deleteUser));

export default router;
