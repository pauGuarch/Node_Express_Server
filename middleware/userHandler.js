import HttpError from "http-errors";
import messagesapp from "../data/messages.js";

// regular expressions: https://regex101.com/
const validateUserEmail = (req, res, next) => {

    console.log(`---> userHandler::validateUserEmail`);

    const body = req.body;

    if (body.username) {
        if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(body.username)) {
            next();
        } else {
            next(HttpError(400, { message: messagesapp.user_invalid_format }))
        }

    }
}

const userAndPasswordFullfilled = (req, res, next) => {

    console.log(`---> userHandler::userAndPasswordFullfilled`);

    const body = req.body;

    if (body.username && body.password) {
        next();
    } else {
        next(HttpError(400, { message: messagesapp.parameter_not_especified }));
    }
}



export default {
    validateUserEmail,
    userAndPasswordFullfilled
};