import HttpError from "http-errors";
import messagesapp from "../data/messages.js";

// Una contraseña que contiene al menos 1 mayúscula, 1 minúscula, 1 dígito, 1 carácter especial
// y tiene una longitud de al menos 10

// regular expressions: https://regex101.com/
const validatePassword= (req, res, next) => {
    const body = req.body;

    if (body.password) {
        if (/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(body.password)) {
            next();
        } else {
            next(HttpError(400, { message: messagesapp.passwd_invalid_format }))
        }

    }
}

export default {
    validatePassword
};