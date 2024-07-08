const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('./beats/index.ejs', {
        catalog: currentUser.catalog,
    });
});

router.get('/new', (req, res) => {
    res.render('./beats/new.ejs');
});

router.get('/:beatId/edit', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    const beatData = currentUser.catalog.id(req.params.beatId);
    res.render('./beats/edit.ejs',{
        beatData: beatData,
    });
});

router.post('/', async (req, res) => {
    const newbeat = {
        title: req.body.title,
        genre: req.body.genre,
        tempo: req.body.tempo,
        key: req.body.key,
        price: req.body.price,
    }
    const beatExists = await User.findOne({
        title: req.body.title,
    });
    if (beatExists) {
        res.render('./beats/sorry.ejs');
    } else {
        try {
            const currentUser = await User.findById(req.session.user._id);
            currentUser.catalog.push(newbeat);
            await currentUser.save();
            res.redirect(`/users/${currentUser._id}/beats`);
        }
        catch {
            console.log(error);
            res.redirect('/');
        }
    }
});

router.put('/:beatId', async (req, res) => {
    const editedbeat = {
        title: req.body.title,
        genre: req.body.genre,
        tempo: req.body.tempo,
        key: req.body.key,
        price: req.body.price,
    }
    try {
        const currentUser = await User.findById(req.session.user._id);
        const catalog = currentUser.catalog.id(req.params.beatId);
        catalog.set(editedbeat);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/beats`);
    }
    catch {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:beatId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const catalog = currentUser.catalog.id(req.params.beatId);
        catalog.deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/beats`);
    }
    catch {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
