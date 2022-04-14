import { ManagerFs } from '../../managers/manager-fs.js';

//'./data/movies.json'

class Movies {

    constructor() {
        this.mgfl = new ManagerFs('./data/movies.json');
        this.movies = this.mgfl.getData();

    }

    getMovies() {
        return this.movies;
    }
    getMovieById(id) {
        console.log(`---> movies::getMovieById = ${id}`);

        return this.movies.find(element => element.id == id);
    }

    getMovieBy(elem) {
        console.log(`---> movies::getMovieBy = ${elem.value}`);

        return this.movies.filter(element => element[elem.key] == elem.value);
    }

    removeMovie(id) {
        console.log(`---> movies::removeMovie = ${id}`);

        const index = this.movies.findIndex(element => element.id == id);
        if (index != -1) this.movies.splice(index, 1);
        return index;
    }

    createMovie(req) {
        console.log(`---> movies::removeMovie = ${req.id}`);

        this.movies.push(req);
        return req;
    }

    updateMovie(req) {
        console.log(`---> movies::updateMovie`);

        const movie = this.getMovieById(req.id);
        if (typeof movie != 'undefined') {
            this.removeMovie(req.id);
            this.createMovie(req);
        }
        return movie;
    }

}

export default new Movies()