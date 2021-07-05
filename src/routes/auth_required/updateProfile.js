const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../model/User');
const verify = require('../../token/verifyToken');
const {userNameValidation, emailValidation, passwordValidation} = require('../../validation/validaton'); 



router.post('/update-profile/username', verify, async (req, res) => {

    const { error } = userNameValidation(req.body);
    if(error) {
        return res.status(400).send(JSON.stringify({'error': error.details[0].message}));
    }

    const usernameExist = await User.findOne({ username: req.body.username });
    if(usernameExist) {
        return res.status(400).send(JSON.stringify({'error': 'Username already exist'}));
    }

    const user = await User.findOneAndUpdate({ _id: req.user.id }, {username: req.body.username});

    res.status(200).send(JSON.stringify({'message': 'OK'}));
})

router.post('/update-profile/email', verify, async (req, res) => {

    const { error } = emailValidation(req.body);
    if(error) {
        return res.status(400).send(JSON.stringify({'error': error.details[0].message}));
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) {
        return res.status(400).send(JSON.stringify({'error': 'Email already exist'}));
    }

    const user = await User.findOneAndUpdate({ _id: req.user.id }, {email: req.body.email});

    res.status(200).send(JSON.stringify({'message': 'OK'}));
})

router.post('/update-profile/password', verify, async (req, res) => {

    try {
        // check if password is the actual user password ???
        // add password validation

        const { error } = passwordValidation(req.body);
        if(error) {
            return res.status(400).send(JSON.stringify({'error': error.details[0].message}));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.findOneAndUpdate({ _id: req.user.id }, {password: hashedPassword});
    } catch (err) {
        console.log(err);
    }
    

    res.status(200).send(JSON.stringify({'message': 'OK'}));
})

module.exports = router;