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
      const supervisors = await suprivisor.find();

   
            res.json(supervisors);
    } catch (err) {
        console.log("fucked UP");

      res.send('Error ' + err);
    }
  });
  
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
///delete  ONE candidate in the candidate list part ////

router.delete('/delete/:supervisorId/candidate/:candidateIndex', async (req, res) => {
    console.log("req.params.supervisorId",req.params.supervisorId)
    console.log("req.params.candidateIndex",req.params.candidateIndex)

    try {
        const supervisor = await suprivisor.findById(req.params.supervisorId);
        if (!supervisor) {
            return res.status(404).send('Supervisor not found');
        }
    
        supervisor.listofcandidate = supervisor.listofcandidate.filter(
            (candidate, index) => index !== parseInt(req.params.candidateIndex)
        );
    
        const updatedSupervisor = await supervisor.save();
        res.json(updatedSupervisor);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

///delete  ONE internship in the internship list part ////

router.delete('/delete/:supervisorId/internship/:internshipIndex', async (req, res) => {
  try {
        const supervisor = await suprivisor.findById(req.params.supervisorId);
        if (!supervisor) {
            return res.status(404).send('Supervisor not found');
        }
    
        supervisor.listofinternship = supervisor.listofinternship.filter(
            (candidate, index) => index !== parseInt(req.params.internshipIndex)
        );
    
        const updatedSupervisor = await supervisor.save();
        res.json(updatedSupervisor);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

  
// update part ///

router.put('/update/:id', async (req, res) => {
    console.log(req.body)
    console.log("the id :",req.params.id)
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