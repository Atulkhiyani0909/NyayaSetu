import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCallHistory,
  updateProfileImages,
  forgetPassword,
  resetPassword
} from '../controllers/user.controller.js';

import { userMiddleware } from "../middlewares/user-auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/forgot-password', forgetPassword);
router.put('/reset-password/:token', resetPassword);

router.get('/call-history', userMiddleware, getCallHistory);

router.put(
  '/upload-documents',
  userMiddleware,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "idProof", maxCount: 1 }
  ]),
  updateProfileImages
);

export default router;
