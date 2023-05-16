const router = require('express').Router();
const Meetrequest = require('../model/Meetrequest');


//add a comment to a specific candidate (bullshit)

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
        const user = await Meetrequest.find({
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
        const request = await Meetrequest.find()


        res.json(request)
    } catch (err) {
        res.send('Error ' + err)
    }
})

// get by id 

router.get('/getbyid/:id', async (req, res) => {
    try {
        const request = await Meetrequest.find({ candidate_ID: req.params.id });

        res.json(request)
    } catch (err) {
        res.send('Error ' + err)
    }
})

// add

router.post('/register/:internID/:internname', async (req, res) => {
    const user = new Meetrequest({
        suprevisor_ID: req.body.suprevisor_ID,
        suprevisor_name: req.body.suprevisor_name,
        candidate_ID: req.params.internID,
        candidate_name: req.params.internname,
        type:req.body.type,
        decsription: req.body.decsription,
        reason: req.body.reason,
        availability: req.body.availability,

        date: new Date()


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
        const request = await Meetrequest.findByIdAndDelete(req.params.id);
        res.json(request)
    } catch (err) {
        res.send('Error' + err)
    }
})

 
// update part ///

router.put('/update/:id', async (req, res) => {
    console.log(req.body)
    console.log("the id :",req.params.id)
    try {
      
        const request = await Meetrequest.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(request)
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router;