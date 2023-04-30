const router = require('express').Router();
const Candidate = require('../model/Candidate');
const {
    loginvalidation
} = require('../validation/authValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



////////////       LOG IN PART //////////////



router.post('/login', async (req, res) => {
    const {
        error
    } = loginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await Candidate.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Email DOES NOT exist !! ')

    const PasswordExist = await bcrypt.compare(req.body.password, user.password);
    if (!PasswordExist) return res.status(400).send('check your PASSWORD')


    //Create the TOKEN
    const token = jwt.sign({
        _id: user._id,
        nameFL: user.nameFL,
        role:user.role
    }, process.env.TOKEN_SECRET);
  
 //Create the TOKEN
 res.json(token);
 
})

const clearTokenCookie = (res) => {
    res.clearCookie('token');
    console.log("token cleared")
};


router.post('/logout', (req, res) => {
    clearTokenCookie(res);
    res.status(200).send('Logged out successfully.');
});


router.get('/user', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied!');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
console.log(verified.nameFL)
console.log(verified._id)

        const user = await Candidate.findById(verified._id);
       
        res.send(user.nameFL);
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
});

module.exports = router;