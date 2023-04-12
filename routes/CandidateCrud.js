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



// create endpoint for applying for an internship
/*router.post('/apply', async (req, res) => {
  console.log("test1")

  console.log("//headers//",req.headers.authorization)
  const token = req.headers.authorization.split(' ')[1];
  console.log("//token//",token)
  console.log("testé")

  /*try {
    // get user id from token
    const token = req.cookies.access_token;
    console.log("//token//",token)
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken._id;
    console.log("////userId////", userId)
    // get internship id from request body
    const internshipId = req.params.internship_ID;
    console.log("////internshipId////", internshipId)

    // create new internship application
    const application = new InternshipApplication({
      internship_ID: internshipId,
      candidate_ID: userId,
      status: "submitted"
    });
    console.log(application.Status)
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
});*/

router.post('/apply/:internship_ID', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // get user id from token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken._id;
    console.log("////userId////", userId)

    // get internship id from request body
    const internshipId = req.params.internship_ID;
    console.log("////internshipId////", internshipId)
    const emailExist = await InternshipApplication.findOne({
      candidate_ID:userId,
      internship_ID: internshipId  
    });
    console.log("/////test1000100///////",emailExist)
    if (emailExist) return res.status(400).send('Email already exist !! ')
  
    // create new internship application
    const application = new InternshipApplication({
      internship_ID: internshipId,
      candidate_ID: userId,
      status: "submitted"
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


router.get('/check1', async (req, res) => {
res.send(console.log("tneket"))
});




module.exports = router;