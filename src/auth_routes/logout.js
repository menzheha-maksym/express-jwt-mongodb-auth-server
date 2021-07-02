const router = require('express').Router();
const Token = require('../model/Token');

// dont check who wants to logout, idk
router.delete('/logout', async (req, res) => {
    
    try {
        const db_token = await Token.findOneAndDelete({ refreshToken: req.body.token })
        console.log("user " + db_token.email + " logged out");

    } catch(err) {
        res.status(400).send(err)
    }    
    
    res.status(204).send("OK")
})


module.exports = router;