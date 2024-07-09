const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const allUsers = await User.find({});
    res.render('./users/index.ejs', {
        allUsers: allUsers,
    });
})

router.get('/:userId', async (req, res) => {
    const currentUser = await User.findOne({
        _id: req.params.userId,
    });
    res.render('./users/show.ejs', {
        currentUser: currentUser,
    });
});


module.exports = router;