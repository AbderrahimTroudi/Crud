
const router = require('express').Router();
const InternshipApplication = require('../model/InternshipApplication');
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

try{

    const user = await InternshipApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(user)
  } catch (err) {
      res.send('Error' + err)
  }
})
  module.exports = router;