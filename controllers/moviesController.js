import HttpError from "http-errors";
import moviesModel from '../models/moviesModel.js';
import messagesapp from '../data/messages.js';

const getAllMovies = (req, res) => {

    console.log("---> moviesController::getAllMovies");

    const movies = moviesModel.getMovies();
    res.json(movies);
}

const getMovieById = (req, res, next) => {

    

    console.log("---> moviesController::getMovieById");

    if (!req.params.id)
        next(HttpError(400, { message: messagesapp.parameter_not_especified }));
    try {

        const id = req.params.id;
        const movie = moviesModel.getMovieById(id);
        res.json(movie);

    } catch (error) {
        next(HttpError(400, { message: error.message }));
    }

}

const removeMovie = (req, res, next) => {
    console.log("---> moviesController::removeMovie");

    if (!req.params.id)
        next(HttpError(400, { message: messagesapp.parameter_not_especified  }));

    const id = req.params.id;
    if (moviesModel.removeMovie(id) == -1) {
        next(HttpError(400, { message: messagesapp.movie_dosent_exist  }));

    }

    getAllMovies(req, res);


}

const createMovie = (req, res, next) => {
    console.log(`---> moviesController::createMovie`);

    if (!req.body)
        next(HttpError(400, { message: messagesapp.parameter_not_especified }));

    try {

        moviesModel.createMovie(req.body);
        getAllMovies(req, res);

    } catch (error) {
        next(HttpError(400, { message: error.message }));
    }

}

const updateMovie = (req, res, next) => {
    console.log(`---> moviesController::updateMovie`);


    try {
        if (!req.body)
            next(HttpError(400, { message: messagesapp.parameter_not_especified }));

        moviesModel.updateMovie(req.body);
        getAllMovies(req, res);

    } catch (error) {
        next(HttpError(400, { message: error.message }));
    }
}


const getMovieBy = (req, res, next) => {
    console.log(`---> moviesController::getMovieBy`);

    if (!req.body)
        next(HttpError(400, { message: messagesapp.parameter_not_especified }));

    const movies = moviesModel.getMovieBy(req.body);
    res.json(movies);
}

//TODO: Actuaizar API
const addActors = (req, res, next) => {
    console.log(`---> moviesController::addActors`);
    if (!req.body)
        next(HttpError(400, { message: messagesapp.parameter_not_especified }));

    const _movie = moviesModel.addActors(req.body);
    res.json(_movie);
}


// TODO: Nueva API devuelve todas las películas donde participa un actor
const getMoviesFromActor = (req, res, next) => {
    console.log(`---> moviesController::getMoviesFromActor`);

    if (!req.body)
        next(HttpError(400, { message: messagesapp.parameter_not_especified }));

    const movies = moviesModel.getMoviesFromActor(req.body);
    res.json(movies);
};


export default {
    getAllMovies,
    getMovieById,
    removeMovie,
    createMovie,
    updateMovie,
    getMovieBy,
    addActors,
    getMoviesFromActor
}