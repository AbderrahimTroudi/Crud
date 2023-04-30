const router = require('express').Router();
const InternshipApplication = require('../model/InternshipApplication');


router.get('/getall', async (req, res) => {
    try {
      const user = await InternshipApplication.find()
      res.json(user)
    } catch (err) {
      res.send('Error ' + err)
    }
  })


  
router.get('/getbyid/:id', async (req, res) => {
    try {

        const paramID = req.params.id
      const user = await InternshipApplication.find({candidate_ID: paramID});
      if(!user) return res.json("No application submitted")
      res.send(user);
  
    } catch (err) {
      res.send('eas ' + err);
    }
  });

  module.exports = router;