const Activity = require('../models/Activity');


function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}
  
// @route   GET api/activity
// @desc    GET an activity
// @access  Private
const getOneActivity= async(req, res) => {
    try{
      const activites=await Activity.find({});
      r = Math.floor(1000 + Math.random() * 9000);
      n=activites.length;
      i = randomInt(0, n);
      res.send(activites[i])
  
    }catch(err){
      console.log(err.message);
      res.status(500).send('server error');
    }
};

// @route   POST api/activity
// @desc    Post an activity
// @access  Private
const addActivity = async (req,res) =>{
    const {title , desc} = req.body;
    try{
      //CREATE NEW ACTIVITY
      activity = new Activity({
        title,
        desc
      });
      if(activity){
      await activity.save();
      res.send("Activity created")
      } else{
          res.status(400)
      }

    }catch(err){
      console.error(err.message);
      res.status(500).send('server error')
    }

};


module.exports = {getOneActivity, addActivity}
