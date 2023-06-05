import express from "express";
import {
    getArticle,
    getArticleById,
    createArticle,
    uploadImage
} from "../controllers/Article.js";
import { validCreateUser, validateImage } from "../validator/ArticleValidator.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/', verifyUser, getArticle);
router.get('/:id', getArticleById);
router.post('/', verifyUser, validCreateUser, createArticle);
router.post('/image', verifyUser, validateImage, uploadImage);

export default router;