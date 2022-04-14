import Router from 'express';
import moviesController from '../controllers/moviesController.js';


const router = Router();

router.use((req, res, next) => {
    console.log('---> moviesRouter.js');
    next();
})

router.route('/')
    .get(moviesController.getAllMovies); // get('/',function (req, res) {})

router.route('/:id')
    .get(moviesController.getMovieById)
    .delete(moviesController.removeMovie);

router.route('/update')
    .put(moviesController.updateMovie); //(req, res, next) => res.send('Metdo PUT/update de Movies'));

router.route('/search')
    .post(moviesController.getMovieBy);

router.route('/searchActor')
    .post(moviesController.getMoviesFromActor);   //(req, res, next) => res.send('Metdo POST/searchActor de Movies'));

router.route('/add')
    .put(moviesController.createMovie);    //(req, res, next) => res.send('Metdo PUT/add de Movies'));

router.route('/addActor')
    .put(moviesController.addActors);    //(req, res, next) => res.send('Metdo PUT/add de Movies'));



router.use((req, res, next) => {
    console.log('---> >>>>>');
    next();

})


export default router;