const router = require('express').Router();
const Condidate = require('../model/Candidate');
const InternshipApplication = require('../model/InternshipApplication');

const jwt = require('jsonwebtoken');

const {
  registration
} = require('../validation/CandidateValidation');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const officeToPdf = require('office-to-pdf');


const storage = multer.memoryStorage();
const upload = multer({
  storage
});


const PDFcheck = require('../middleware/PDFfile-check')

//search bar 
router.get('/search', async (req, res) => {
  try {
    const searchText = req.query.q;
    const user = await Condidate.find({
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
router.get('/getinterns', async (req, res) => {
  try {
    const user = await Condidate.find({role:'intern'}).select('-name -data -contentType');
    res.json(user)
  } catch (err) {
    res.send('Error ' + err)
  }
})
router.get('/getall', async (req, res) => {
  try {
    const user = await Condidate.find().select('-name -data -contentType')
    res.json(user)
  } catch (err) {
    res.send('Error ' + err)
  }
})
//get by id for the details 

router.get('/getdetails/:id', async (req, res) => {
  try {

    const user = await Condidate.findById(req.params.id).select('-name -data -contentType');
    res.send(user);

  } catch (err) {
    res.send('Error ' + err);
  }
});
// get by id 

router.get('/getbyid/:id', async (req, res) => {
  try {
    const user = await Condidate.findById(req.params.id);

    res.set('Content-Type', 'application/pdf');
    console.log(user.contentType);
    res.set('Content-Disposition', `inline; filename="${user.name}"`);
    console.log(user.name);
    res.send(user.data);

  } catch (err) {
    res.send('Error ' + err);
  }
});
// add

router.post('/register', upload.single('file'), PDFcheck(), async (req, res) => {

  //validate the data 



  //check if user already exist 
  const emailExist = await Condidate.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send('Email already exist !! ')

  //hashing the PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);



  //////////////////////this part should be replaced with a PDF file check middleware ////////////////////////////////////////

  /* if (req.file.mimetype !== 'application/pdf') {
     req.flash('warning', 'Please upload a PDF file.');
     return res.redirect('/register');
   }*/
  //////////////////////this part should be replaced with a PDF file check middleware ////////////////////////////////////////

  const user = new Condidate({
    nameFL: req.body.nameFL,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    skills: req.body.skills,
    resume: req.body.file,
    role: req.body.role,

    name: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype

  });

  try {
    const savedCondidate = await user.save();
    res.send(savedCondidate);
  } catch (error) {
    res.status(400).send(error);
  }
});

///delete part ////

router.delete('/delete/:id', async (req, res) => {
  try {
    const user = await Condidate.findByIdAndDelete(req.params.id);
    res.json(user)
  } catch (err) {
    res.send('Error' + err)
  }
})
// update part ///

router.put('/update/:id', async (req, res) => {


  try {
    const user = await Condidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    
    res.json(user)
  } catch (err) {
    res.send('Error' + err)
  }
})

router.post('/apply/:internship_ID', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
const Internshiptitle = req.body.title;
console.log("Internshiptitle",Internshiptitle)
  try {
    // get user id from token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken._id;
    const userName = decodedToken.name

    // get internship id from request body
    const internshipId = req.params.internship_ID;
    const count = await InternshipApplication.countDocuments({ candidate_ID: userId });
    if(count == 3){
      return res.status(400).send('you have reached your application number limit')
    }
    const emailExist = await InternshipApplication.findOne({
      candidate_ID:userId,
      internship_ID: internshipId 
       });
    if (emailExist) return res.status(400).send('Email already exist !! ')
  

    // create new internship application
    const application = new InternshipApplication({
      internship_ID: internshipId,
      title:Internshiptitle,
      candidate_ID: userId,
      candidate_name:userName,
      status: "submitted",
 
    });

    // save the application to the database
    const savedApplication = await application.save();

    // send a response indicating success
    res.status(200).json({
      message: 'Application submitted successfully',
      application: savedApplication
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error)
  }
});


router.get('/getallapplication', async (req, res) => {
  try {
    const user = await InternshipApplication.find().select('-name -data -contentType')
    res.json(user)
  } catch (err) {
    res.send('Error ' + err)
  }});


////////////////////////////////get a progress////////////////////////////////

  router.get('/getprogress/:id', async (req, res) => {
    try {
      const user = await Condidate.findById(req.params.id).select('progressList')
      res.json(user)
    } catch (err) {
      res.send('Error ' + err)
    }});

//////////////////////////////////add a progress////////////////////////////////
router.post('/addprogress/:id', async (req, res) => {
  const { title, description } = req.body; // extract title and description from request body
  if (!title || !description) {
    return res.status(400).send('Enter title and description'); // return error if title or description is missing
  }

  const newProgress = {
    dateAdd: new Date(), // add current date
    title,
    description,
    comment:''
  };

  try {
    const user = await Condidate.findById(req.params.id).select('-name -data -contentType');
    user.progressList.push(newProgress);
    user.save();
    res.send("Progress Added");
  } catch (err) {
    res.send('Error ' + err);
  }
});


module.exports = router;