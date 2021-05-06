const router = require('express').Router();
const Token = require('../model/Token');

router.delete('/logout', async (req, res) => {
    
    try {
        const db_token = await Token.findOneAndDelete({ refreshToken: req.body.token })
    } catch(err) {
        res.status(400).send(err)
    }    
    
    res.status(204).send("OK")
})


module.exports = router;