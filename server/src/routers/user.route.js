import express from 'express'
import { EditUserProfile } from '../controllers/user.controller.js'
import { AuthProtect } from '../middlewares/auth.middleware.js'
import multer from 'multer'

const Upload = multer()
const router = express.Router();

router.put("/edit-profile", AuthProtect, Upload.single("displayPic"), EditUserProfile)

export default router;