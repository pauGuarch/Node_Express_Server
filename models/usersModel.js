import users from '../data/user.js';
import notices from '../data/notices.js'

class User {

    createUser(user) {
        console.log(`---> userModel::createUser ${user.username}`);
        users.push(user);
        return users.find(element => element.username == user.username);

    }

    getUser(user) {
        console.log(`---> userModel::getUser ${user.username}`);
        return users.find(element => (element.username == user.username))

    }

    updatePassword(user) {
        console.log(`---> userModel::updatePassword ${user.username}/${user.password}`);

        const _user = users.find(element => (element.username == user.username));
        if (_user !== undefined) { _user.password = user.newpassword; }

        console.log(`---> userModel::updatePassword ${_user.password}/${user.newpassword}`);

        return _user;

    }

    addGrantPrivileges(user) {
        console.log(`---> userModel::addGrantPrivileges ${user.username}`);
        const _user = users.find(element => (element.username == user.username));
        if (_user !== undefined) { _user.grants = user.grants; }

        return _user;
    }

    deleteGrantPrivileges(user) {
        console.log(`---> userModel::deleteGrantPrivileges ${user.username}`);
        const _user = users.find(element => (element.username == user.username));
        if (_user !== undefined) {
            _user.grants = _user.grants.filter(element => !user.grants.includes(element));
        }

        return _user;
    }


    insertGrantPrivileges(user) {
        console.log(`---> userModel::insertGrantPrivileges ${user.username}`);
        const _user = users.find(element => (element.username == user.username));
        user.grants.forEach(element => {
            _user.grants.push(element);
        });

        return _user;
    }

    dropUser(user) {
        console.log(`---> userModel::dropUser ${user.username}`);
        const _user = users.find(element => (element.username == user.username));
        if (_user !== undefined) { _user.active = 0; }

        return _user;

    }

    raiseUser(user) {
        console.log(`---> userModel::raiseUser ${user.username}`);
        const _user = users.find(element => (element.username == user.username));
        if (_user !== undefined) { _user.active = 1; }

        return _user;

    }
    getNotices(user){
        console.log('-----userinModel----->'+user);
        const noticeUser = notices.find(element=>(element.username==user))
        if(noticeUser){
            return noticeUser.notices;
        }else{
            return 0;
        }
    }
    addProfile(user) {
        console.log(`---> userModel::addProfile ${user.username}`);
        console.log(user.profile);
        const _user = users.find(element => (element.username == user.username));
        if (_user !== undefined) { _user.profiledata = user.profile; }

        return _user;
    }
}

export default new User();