import movie from './movies/movies.js';
import actor from './actors/actors.js';
import moviePojo from '../models/movies/moviePojo.js';
import actorPojo from '../models/actors/actorPojo.js';
import messagesapp from "../data/messages.js";


class MoviesModel {


    getMovies() {

        console.log("---> moviesModel::getMovies");

        const movies = movie.getMovies();
        movies.forEach(element => {
            element.actors = actor.getActorsById(element.id).actors;
        });


        return movies;
    }
    getMovieById(id) {

        console.log(`---> moviesModel::getMovieById = ${id}`);

        const _movie = movie.getMovieById(id);
        if (typeof _movie == 'undefined')
            throw new Error(messagesapp.movie_dosent_exist);

        _movie.actors = actor.getActorsById(_movie.id).actors;
        return _movie;
    }

    removeMovie(id) {

        console.log(`---> moviesModel::removeMovie = ${id}`);

        const index = movie.removeMovie(id);
        if (index != -1) { actor.removeActors(id) }
        return index;
    }


    getMovieBy(elem) {
        console.log(`---> moviesModel::getMovieBy = ${elem.value}`);


        const _movies = movie.getMovieBy(elem);

        _movies.forEach(element => {
            element.actors = actor.getActorsById(element.id).actors;

        });
        return _movies;
    }


    createMovie(req) {

        console.log(`---> moviesModel::createMovie = ${req.id}`);

        const new_movie = moviePojo(req);
        if (typeof new_movie == 'undefined')
            throw new Error(messagesapp.movie_error_create);

        const new_actor = actorPojo(req);
        if (typeof new_actor == 'undefined')
            throw new Error(messagesapp.actor_error_create);

        movie.createMovie(new_movie);
        actor.createActors(new_actor);
    }

    updateMovie(req) {
        console.log(`---> moviesModel::updateMovie = ${req.id}`);

        const new_movie = moviePojo(req);
        if (typeof new_movie == 'undefined')
            throw new Error(messagesapp.movie_error_update);

        const new_actor = actorPojo(req);
        if (typeof new_actor == 'undefined')
            throw new Error(messagesapp.actor_error_update);

        const _movie = movie.updateMovie(new_movie);
        if (typeof _movie == 'undefined')
            throw new Error(messagesapp.movie_error_update);

        const _actor = actor.updateActors(new_actor);
        if (typeof _actor == 'undefined')
            throw new Error(messagesapp.actor_error_update);


    }

    getMoviesFromActor(req) {
        console.log(`---> moviesModel::getMoviesFromActor = ${req.id}`);

        let _movies = [];

        const movies_id = actor.getIDFromActor(req)
        movies_id.forEach(element => {
            _movies.push(movie.getMovieById(element.id));
        });

        return _movies;
    }

    addActors(req) {
        console.log(`---> moviesModel::addActors = ${req.id}`);

        actor.addActorToMovie(req)
        return this.getMovieById(req.id);

    }

}

export default new MoviesModel()