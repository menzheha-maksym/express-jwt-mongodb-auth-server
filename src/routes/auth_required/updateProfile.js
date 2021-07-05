const router = require('express').Router();
const User = require('../../model/User');
const verify = require('../../token/verifyToken');



router.post('/update-profile/username', verify, async (req, res) => {

    const usernameExist = await User.findOne({ name: req.body.name });
    if(usernameExist) {
        return res.status(400).send(JSON.stringify({'error': 'Username already exist'}));
    }

    const user = await User.findOneAndUpdate({ _id: req.body.userId }, {name: req.body.name});

    res.status(200).send(JSON.stringify({'message': 'OK'}));
})

router.post('/update-profile/email', verify, async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) {
        return res.status(400).send(JSON.stringify({'error': 'Email already exist'}));
    }

    const user = await User.findOneAndUpdate({ _id: req.body.userId }, {email: req.body.email});

    res.status(200).send(JSON.stringify({'message': 'OK'}));
})

module.exports = router;