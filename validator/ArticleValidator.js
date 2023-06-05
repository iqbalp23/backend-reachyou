import Validator from "fastest-validator";

const v = new Validator();

export const validCreateUser = (req, res, next) => {
    const request = req.body;
    const user = req.app.locals.user;
    const userid = {
        userid: user.id
    }
    Object.assign(request, userid);
    const scema = {
        title: { type: 'string', min: 3, max: 255, required : true},
        description : { type: 'string', min: 3, required : true},
        image: { type: 'string', min: 5, max: 255 , required : true},
        userid: {type: 'number', positive: true},
        $$strict: true
    }
    const result = v.validate(request, scema);
    if(result !== true){
        return res.status(400).send(result);
    }
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const splitFileName = request.image.split('.');
    const ext = splitFileName[splitFileName.length - 1];
    if(!allowedExtensions.includes(ext.toLowerCase())) {
        return res.status(400).send({
            "type": "invalid image",
            "message": "The 'image' field is invalid image.",
            "field": "image"
        });
    }
    req.app.locals.article = request;
    next();
}

export const validateImage = (req, res, next) => {
    const scema = {
        name: { type: 'string', min: 1 },
        size: { type: 'number', positive: true, max: 2 * 1024 * 1024 },
        mimetype: { type: 'string', enum: ['image/jpg', 'image/jpeg', 'image/png'] },
    };
    const files = req.files?.image;
    if(!files) {
        return res.status(400).send({
            "type": "required",
            "message": "The 'image' field is required.",
            "field": "image"
        });
    }
    const result = v.validate(files, scema);
    if(result === true){
        next();
        return;
    }

    return res.status(400).send(result);
}