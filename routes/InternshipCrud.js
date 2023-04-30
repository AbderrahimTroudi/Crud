const router = require('express').Router();
const Internship = require ('../model/Internship');
const {registration} = require('../validation/InternshipValidation');
const moment = require("moment");
const suprivisor =require('../model/suprivisor')

//search bar 
router.get('/search', async (req, res) => {
    try {
      const searchText = req.query.q;
      const user = await Internship.find({
        $or: [
          { title: { $regex: searchText, $options: 'i' } },
          { requirements: { $regex: searchText, $options: 'i' } },
          { status: { $regex: searchText, $options: 'i' } },

        ]
      });
      res.json(user);
    } catch (err) {
      res.send('Error ' + err);
    }
  });

 /* router.get('/searchs', (req, res) => {
    const searchTerm = req.query.q;
    Internship.find({ $text: { $search: searchTerm } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .exec()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.error(err);
        res.send('Error ' + err);
      });});*/
  
// get all 
router.get('/getall', async(req,res) => {
    try{
        const user = await Internship.find()
        res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})
// get by id 
router.get('/getbyid/:id', async(req,res) => {
    try{
           const user = await Internship.findById(req.params.id)
           res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})
// add
router.post('/register', async(req,res) => {

    //validate the data 
   const {error} =  registration(req.body);
   if (error) return res.status(400).send(error.details[0].message);


   //check if user already exist 
    const InternshipExist = await Internship.findOne({title:req.body.title});
    if(InternshipExist) return res.status(400).send('Internship already exist !! ')

const internship = new Internship({
    title:req.body.title,
    description:req.body.description,
    requirements:req.body.requirements,
    duration_weeks:req.body.duration_weeks,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    max_candidates:req.body.max_candidates,
    spots_available:req.body.spots_available,
    status:req.body.status,
    category:req.body.category,
    suprivisorid:req.body.suprivisorid,
    created_at:new Date(),
    updated_at:new Date(),

   
});

try {
    const savedInternship = await internship.save();

     const user = await suprivisor.findById(req.body.suprivisorid);
   
     user.listofinternship.push([savedInternship.title, savedInternship._id]);
     
      const savedUser = await user.save();
    res.send(savedUser);
} catch (error) {
    res.status(400).send(error);
}

//adding the internship to the list of interships of the supervisor

});
///delete part ////
router.delete('/delete/:id', async(req,res) => {
    try{
        const user = await Internship.findByIdAndDelete(req.params.id);
        res.json(user)
    }catch(err){
        res.send('Error'+ err)
    }
})
// update part ///
router.put('/update/:id', async(req,res) => {
    try{
        const user = await Internship.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(user)
    }catch(err){
        res.send('Error'+ err)
    }
})

module.exports = router;