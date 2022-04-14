import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messagesapp from "../data/messages.js";

const setNewUser = (user, messageIn)=>{
    
    let tempUser = {
        username: user.username,
        timestamp: user.timestamp,
        message: messageIn,
        grants: user.grants,
        profile: user.profiledata
    }
    if(!user.grants){
        tempUser.grants = 0;
    }
    return tempUser;
}

const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;
        console.log(`---> userController::register ${body.password}`);
        const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) , active: (body.avtive || 1)};

        result = userModel.getUser(user);
        if (result != undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            result = userModel.createUser(user);
            if (result < 0){
                next(HttpError(400, { message: messagesapp.user_error_register }));
            }else{
                res.status(201).json(setNewUser(result, messagesapp.user_correct_register));
            }
        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;
        const user = { username: body.username, password: body.password };
        const result = userModel.getUser(user);
        console.log(result);
        const notices=userModel.getNotices(result.username);
        console.log(notices);
        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            console.log(`---> userController::login ${result.password}`);
            console.log(`---> userController::login ${body.password}`);

            if (!result.active){
                next(HttpError(400, { message: messagesapp.user_error_active}));
            }else{

                if (!bcrypt.compareSync(body.password, result.password)){
                    next(HttpError(400, { message: messagesapp.user_error_login }));
                }else{
                    const finalresult = {
                        username: result.username,
                        timestamp: result.timestamp,
                        message: messagesapp.user_correct_login,
                        notices: notices
                    }
                    res.status(200).json(finalresult);
                }

            }

        }

    } catch (error) {
        next(error);
    }
};

const updatePassword = (req, res, next) => {
    console.log(`---> userController::updatePassword`);

    try {
        const body = req.body;
        const user = { username: body.username, password: body.password, newpassword: body.newpassword };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            if (!bcrypt.compareSync(body.password, result.password))
                next(HttpError(400, { message: messagesapp.user_error_login  }));
            else {
                const result_new = userModel.updatePassword(user);
                res.status(200).json(setNewUser(result_new, messagesapp.user_correct_update));
            }
        }
    } catch (error) {
        next(error);
    }
};

const addGrantPrivileges = (req, res, next) => {
    console.log(`---> userController::addGrantPrivileges`);

    try {
        const body = req.body;
        const user = { username: body.username, grants: body.grants };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.addGrantPrivileges(user);
            res.status(200).json(setNewUser(result_new, messagesapp.user_grants_correct));
        }
    } catch (error) {
        next(error);
    }
};


const insertGrantPrivileges = (req, res, next) => {
    console.log(`---> userController::insertGrantPrivileges`);

    try {
        const body = req.body;
        const user = { username: body.username, grants: body.grants };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.insertGrantPrivileges(user);
            res.status(200).json(setNewUser(result_new, messagesapp.user_grants_correct));
        }
    } catch (error) {
        next(error);
    }
};



const deleteGrantPrivileges = (req, res, next) => {
    console.log(`---> userController::deleteGrantPrivileges`);

    try {
        const body = req.body;
        const user = { username: body.username, grants: body.grants };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.deleteGrantPrivileges(user);
            res.status(200).json(setNewUser(result_new, messagesapp.user_grants_deleted));
        }
    } catch (error) {
        next(error);
    }
};

const getUser = (req, res, next) => {
    console.log(`---> userController::getUser`);

    try {
        console.log(req.params.user)
        const user = req.params.user;
        const result = userModel.getUser({username:user});
        
        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const _result = JSON.parse(JSON.stringify(result));
            delete _result.password;
            res.status(200).json(_result);
        }
    } catch (error) {
        next(error);
    }
};

const deleteUser = (req, res, next) => {
    console.log(`---> userController::dropUser`);

    try {
        const body = req.body;
        const user = { username: body.username };
        const result = userModel.getUser(user);
       

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.dropUser(user);
            res.status(200).json(setNewUser(result_new, messagesapp.user_delete_correct));
        }
    } catch (error) {
        next(error);
    }
};


const activeUser = (req, res, next) => {
    console.log(`---> userController::activeUser`);

    try {
        const body = req.body;
        const user = { username: body.username };
        const result = userModel.getUser(user);
       
        if (result === undefined) {
            next(HttpError(400, {message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.raiseUser(user);
            res.status(200).json(setNewUser(result_new, messagesapp.user_activated));
        }
    } catch (error) {
        next(error);
    }
};

const addProfile = (req, res, next)=>{
    try {
        const body = req.body;
        const user = { username: body.username, profile: body.profiledata };
        // console.log('add profile CONTROLLER'+user.profile);
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.addProfile(user);
            console.log(result_new);
            res.status(200).json(setNewUser(result_new, messagesapp.user_added_profile));
        }
    } catch (error) {
        next(error);
    }
}
const getFullUser=(req, res, next)=>{
    try {
        const body = req.body;
        let result;
        console.log(`---> userController::register ${body.password}`);
        const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) , active: (body.avtive || 1)};

        result = userModel.getUser(user);
        if (result == undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            res.status(201).json(result);
        }

    } catch (error) {
        next(error);
    }
}


export default {
    register,
    login,
    updatePassword,
    addGrantPrivileges,
    deleteGrantPrivileges,
    insertGrantPrivileges,
    getUser,
    deleteUser,
    activeUser,
    addProfile,
    getFullUser

}