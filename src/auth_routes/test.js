const router = require('express').Router();
const verify = require('../token/verifyToken');

router.get('/test', (req, res) => {


    res.send("Test route AUTH SERVER GET");
})



module.exports = router