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

    // check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Email already exist');
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: "username-not-set",//req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUSer = await user.save();
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;