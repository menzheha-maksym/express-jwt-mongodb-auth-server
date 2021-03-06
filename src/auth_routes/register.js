const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../model/User');
const {registerValidation} = require('../validation/validaton')


router.post('/register', async (req, res) => {

    // LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    console.log("user " + req.body.email + " tries to register");

    // check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send(JSON.stringify({'error': 'Email already exist'}));
    }

    // check if username is already exists
    const usernameExist = await User.findOne({ username: req.body.username });
    if(usernameExist) {
        return res.status(400).send(JSON.stringify({'error': 'Username already exist'}));
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUSer = await user.save();
        //res.send({ user: user._id })
        res.status(200).send(JSON.stringify({'message': 'Register success'}));
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;