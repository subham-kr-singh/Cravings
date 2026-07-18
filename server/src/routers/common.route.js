import express from 'express'
import { EditUserProfile, updateUserPassword } from '../controllers/common.controller.js'
import { AuthProtect } from '../middlewares/auth.middleware.js'
import multer from 'multer'

const Upload = multer()
const router = express.Router();

router.put("/edit-profile", AuthProtect, Upload.single("displayPic"), EditUserProfile)

router.patch("/change-password", AuthProtect, updateUserPassword);

export default router;