const router = require('express').Router();
const Internship = require('../model/Internship');
const suprivisor =require('../model/suprivisor')
const {
    registration
} = require('../validation/UserValidation');

const bcrypt = require('bcryptjs');

//add a comment to a specific candidate

router.get('/addcomment/:id', async (req, res) => {
    try {
        const user = await suprivisor.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.send('Error ' + err)
    }
})


//search bar 
router.get('/search', async (req, res) => {
    try {
        const searchText = req.query.q;
        const user = await suprivisor.find({
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
        const suprivisors = await suprivisor.find()


        res.json(suprivisors)
    } catch (err) {
        res.send('Error ' + err)
    }
})

// get by id 

router.get('/getbyid/:id', async (req, res) => {
    try {
        const user = await suprivisor.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.send('Error ' + err)
    }
})

// add

router.post('/register', async (req, res) => {

    //validate the data 
   /* const {
        error
    } = registration(req.body);
    if (error) return res.status(400).send(error.details[0].message);
*/

    //check if user already exist 
    const emailExist = await suprivisor.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send('Email already exist !! ')

    //hashing the PASSWORD

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new suprivisor({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        jobtitle:req.body.jobtitle,
        phone: req.body.phone,
        githublink: req.body.githublink,
        linkedinlink: req.body.linkedinlink,
        description:req.body.description,
        speacialty:req.body.speacialty,

        created_at: new Date()


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
        const user = await suprivisor.findByIdAndDelete(req.params.id);
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})

// update part ///

router.put('/update/:id', async (req, res) => {
    try {
        const user = await suprivisor.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})


router.get('/getallinternship/:id', async (req, res) => {
    try {
        const user = await suprivisor.findById(req.params.id);
   
        res.send(user.listofinternship);
    } catch (err) {
        res.send('Error ' + err); 
    }
});



module.exports = router;