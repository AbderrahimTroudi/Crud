const router = require('express').Router();
const SupervisorArchive =require('../model/SupervisorArchive')



const soky = require('./notif');


// get all 

router.get('/getall', async (req, res) => {
    try {
        const SupervisorArchives = await SupervisorArchive.find()


        res.json(SupervisorArchives)
    } catch (err) {
        res.send('Error ' + err)
    }
  
})

// get by id 

router.get('/getbyid/:id', async (req, res) => {
    try {
        const user = await SupervisorArchive.findById(req.params.id)
        res.json(user)
        const notification = "yupp we did it "
        soky.emit('notification', notification);
    } catch (err) {
        res.send('Error ' + err)
    }
})

// add

router.post('/addtoarchive', async (req, res) => {
console.log(req.body)
console.log("createdAt",req.body.createdAt)


    const user = new SupervisorArchive({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        jobtitle:req.body.jobtitle,
        phone: req.body.phone,
        githublink: req.body.githublink,
        linkedinlink: req.body.linkedinlink,
        description:req.body.description,
        speacialty:req.body.speacialty,
        listofinternship:req.body.listofinternship,
        listofcandidate:req.body.listofcandidate,

        createdAt:req.body.createdAt,
        archive_date: new Date()


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
        const user = await SupervisorArchive.findByIdAndDelete(req.params.id);
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})
///delete  ONE candidate in the candidate list part ////


  
// update part ///

router.put('/update/:id', async (req, res) => {
    console.log(req.body)
    console.log("the id :",req.params.id)
    try {
      
        const user = await SupervisorArchive.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(user)
    } catch (err) {
        res.send('Error' + err)
    }
})


router.get('/getallinternship/:id', async (req, res) => {
    try {
        const user = await SupervisorArchive.findById(req.params.id);
   
        res.send(user.listofinternship);
    } catch (err) {
        res.send('Error ' + err); 
    }
});



module.exports = router;