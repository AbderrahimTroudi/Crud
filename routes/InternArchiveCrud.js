const router = require('express').Router();
const InternArchive = require('../model/InternArchive');



router.get('/getall', async (req, res) => {
  try {
    const user = await InternArchive.find().select('-name -data -contentType')
    res.json(user)
  } catch (err) {
    res.send('Error ' + err)
  }
})
//get by id for the details 

router.get('/getdetails/:id', async (req, res) => {
  try {

    const user = await InternArchive.findById(req.params.id)
    res.send(user);

  } catch (err) {
    res.send('Error ' + err);
  }
});


// add

router.post('/addtoarchive', async (req, res) => {
console.log("req.body.created_date:" , req.body.created_date)
  const user = new InternArchive({
    nameFL: req.body.nameFL,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    skills: req.body.skills,
    education:req.body.education,
    aboutme:req.body.aboutme,
    progressList:req.body.progressList,
    created_date:req.body.created_date,

    archived_date:new Date()

  });

  try {
    const savedInternArchive = await user.save();
    res.send(savedInternArchive);
  } catch (error) {
    res.status(400).send(error);
  }
});

///delete part ////

router.delete('/delete/:id', async (req, res) => {
  try {
    const user = await InternArchive.findByIdAndDelete(req.params.id);
    res.json(user)
  } catch (err) {
    res.send('Error' + err)
  }
})
// update part ///

router.put('/update/:id', async (req, res) => {


  try {
    const user = await InternArchive.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    
    res.json(user)
  } catch (err) {
    res.send('Error' + err)
  }
})


module.exports = router;