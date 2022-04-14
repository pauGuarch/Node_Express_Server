import bcrypt from 'bcrypt';

const encryptPassword = (req, res, next) => {
    try {
        const saltRounds = 10;

        if (req.body.password) {
            console.log(`---> encryptPassword ${req.body.password}`);
            const passwordHash = bcrypt.hashSync(req.body.password, saltRounds);
            req.body.password = passwordHash;
            console.log(`---> encryptPassword ${req.body.password}`);
        }

        next();

    } catch (error) {
        next(error);
    }
}

const encryptNewPassword = (req, res, next) => {
    try {
        const saltRounds = 10;

        if (req.body.newpassword) {
            console.log(`---> encryptNewPassword ${req.body.newpassword}`);
            const new_passwordHash = bcrypt.hashSync(req.body.newpassword, saltRounds);
            req.body.newpassword = new_passwordHash;
            console.log(`---> encryptNewPassword ${req.body.newpassword}`);
        }

        next();

    } catch (error) {
        next(error);
    }
}

const encryptPasswordTest = () => { console.log("Test encryptPasswordTest") }




export default {
    encryptPassword,
    encryptNewPassword,
    encryptPasswordTest
   
};