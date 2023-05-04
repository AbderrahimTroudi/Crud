
const router = require('express').Router();
const InternshipApplication = require('../model/InternshipApplication');
const Candidate = require('../model/Candidate');
const Mentor = require('../model/suprivisor');
const Internship = require('../model/Internship');

router.get('/getallapplication', async (req, res) => {
    try {
      const user = await InternshipApplication.find()
      res.json(user)
    } catch (err) {
      res.send('Error ' + err)
    }});
  
  
  
router.delete('/delete/:id', async (req, res) => {
    try {
      const user = await InternshipApplication.findByIdAndDelete(req.params.id);
      res.json(user)
    } catch (err) {
      res.send('Error' + err)
    }
  })
  

  router.get('/getbyid/:id', async (req, res) => {
    try {
        const user = await InternshipApplication.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.put('/update/:id', async (req, res) => {
  try {
    console.log("checked 1")
   //update the status from submitted to accpeted or refused
    const InternshipApp = await InternshipApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(req.body.status == 'accepted'){
    //update the role from user to Intern
    const Intern = await Candidate.findByIdAndUpdate(InternshipApp.candidate_ID, { role: "intern" }, 
    { new: true }) .select('role nameFL'); ;
    const internship = await Internship.findById(InternshipApp.internship_ID) // get the suprivisor ID from the internship table
    const mentor = await Mentor.findById(internship.suprivisorid);// add the intern to the candidatelist on the his suprevisor
    mentor.listofcandidate.push([Intern.nameFL,Intern._id])  ;
   

    mentor.save()
      res.json({Intern,InternshipApp})
  
  }
  else{
  res.json(InternshipApp)}
  } catch (err) {
    console.error('Error:', err);
    res.send('Error' + err)
  }
})

  module.exports = router;