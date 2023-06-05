import Article from "../models/ArticleModel.js"
import { randomBytes, randomUUID } from 'crypto';

const attributes = ['uuid', 'userid', 'title','description','image', 'createdAt'];

const randomString = () => {
    const bytes = randomBytes(Math.ceil(10 / 2));
    const random = bytes.toString('hex').slice(0, 10);
    return `${randomUUID()}-${random}`;
}

const getError = (res) =>  {
    return res.status(500).send({
        data: "interval server error"
    })
}

export const getArticle = async(req, res) => {
    try {
        const result = await Article.findAll({
            attributes
        });
        return res.status(200).send(result);
    } catch (error) {
        return getError(res);
    }
}

export const getArticleById = async(req, res) => {
    try {
        const result = await Article.findOne({
            where: {
                uuid: req.params.id
            },
            attributes,
        });
        if(!result) {
            return res.status(404).send({data : "article not found"})
        }
        return res.send(result);
    } catch (error) {
        return getError(res);
    }
}

export const createArticle = async(req, res) => {
    try {
        const result = await Article.create(req.app.locals.article);
        return res.send(result);
    } catch (error) {
        return getError(res);
    }
}

export const uploadImage = async(req, res) => {
    try {
        const file = req.files.image;
        const newFileName = `public/article/${randomString()}-${file.name.split(" ").join("")}`
        file.mv(`./${newFileName}`, (err)=> {
            if (err) {
                console.log(err);
                return;
            }
        });
        return res.send({
            name: newFileName
        });
    } catch (error) {
        return getError(res);
    }
} 