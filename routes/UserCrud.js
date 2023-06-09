const router = require('express').Router();
const User = require('../model/User');
const Candidate =require('../model/Candidate')
const {
    registration
} = require('../validation/UserValidation');

const bcrypt = require('bcryptjs');


//search bar 
router.get('/search', async (req, res) => {
    try {
        const searchText = req.query.q;
        const user = await User.find({
            name: {
                $regex: searchText,
                $options: 'i'
            }
        });
        res.json(user);
    } catch (err) {
        res.send('Error ' + err);
    }
});

// get all 

router.get('/getall', async (req, res) => {
    try {
        const user = await User.find()
        const candidates = await Candidate.find().select('nameFL email password');


        res.json([user,candidates])
    } catch (err) {
        res.send('Error ' + err)
    }
})

// get by id 

router.get('/getbyid/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.send('Error ' + err)
    }
})

// add

router.post('/register', async (req, res) => {

    //validate the data 
    const {
        error
    } = registration(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //check if user already exist 
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send('Email already exist !! ')

    //hashing the PASSWORD

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

///delete part ////

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})

// update part ///

router.put('/update/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router;