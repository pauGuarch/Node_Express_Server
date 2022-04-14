import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middleware/authHandler.js'
import userHandler from '../middleware/userHandler.js';
import passHandler from '../middleware/passHandler.js';



const router = Router();

const addTimestamp = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.timestamp = new Date();
    next();
}

router.route('/profiledata')
    .post(userController.addProfile);

router.use((req, res, next) => {
    console.log('---> userRouter.js');
    next();
});

router.route('/:user')
    .get(userController.getUser)

router.use(userHandler.validateUserEmail);

router.route('/register')
    .all(userHandler.userAndPasswordFullfilled)
    .post(passHandler.validatePassword)
    .post(authHandler.encryptPassword)
    .post(addTimestamp)
    .post(userController.register);

router.route('/login')
    .all(userHandler.userAndPasswordFullfilled)
    .post(userController.login);

router.route('/grants')
    .post(userController.addGrantPrivileges)
    .delete(userController.deleteGrantPrivileges)
    .put(userController.insertGrantPrivileges);

router.route('/newpass')
    .all(userHandler.userAndPasswordFullfilled)
    .put(authHandler.encryptNewPassword)
    .put(userController.updatePassword);

router.route('/user')
    .post(userController.getFullUser)
    .delete(userController.deleteUser)
    .put(userController.activeUser)

    

export default router;
