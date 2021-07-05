const router = require('express').Router();
const User = require('../../model/User');
const verify = require('../../token/verifyToken');



router.post('/update-profile/username', verify, async (req, res) => {

    const usernameExist = await User.findOne({ name: req.body.name });
    if(usernameExist) {
        console.log("exist " + req.body.name);
        return res.status(400).send(JSON.stringify({'error': 'Username already exist'}));
    }

    console.log("not exist " + req.body.name);

    const user = await User.findOneAndUpdate({ _id: req.body.userId }, {name: req.body.name});

    res.status(200).send(JSON.stringify({'message': 'OK'}));
})

module.exports = router;