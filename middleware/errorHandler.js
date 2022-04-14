import HttpError from "http-errors"

const clientErrorHandler = (error, req, res, next) => {

    console.log("---> errorHandler::clientErrorHandler");

    if (error instanceof HttpError.HttpError) {
        res.status(error.statusCode).json({ ERROR: error.message })
    } else {
        next(error);
    }
}


export default clientErrorHandler;