const Joi = require('joi');
const feedbackModel = require('../models/feedback-model');
const userModel = require('../models/user-model');
var path = require('path');
const fs = require('fs')

exports.create = async(req,res)=>{
  try {
    const{user} = req;
    let sampleFile;
    let uploadPath = "";
  
    if (req.files && req.files.Commentfile ) {
        sampleFile = req.files.Commentfile;
        uploadPath = path.join(__dirname+ '/../public', 'uploads/') + Date.now().toString()+sampleFile.name;
      
    
        err = sampleFile.mv(uploadPath,  function(err) {
          if (err){
              this.err = err;
            
    
          }     
        });
        if (err){
            return res.status(400).send(err);
        }
      
    }
    var userId = req.params.id
if(user.data._id == userId ){

    
    let updatedfeedback = new feedbackModel({
        Name:req.body.Name,
        email:req.body.email,
        Comment:req.body.Comment,
        Commentfile:uploadPath.split(path.join(__dirname+ '/../' )).pop()        
    })
   
    updatedfeedback.save().then(docComment => {
        console.log("\n>> Created Comment:\n", docComment);
    
        return userModel.findByIdAndUpdate(
          userId,
          { $push: { feedback: docComment._id } },
          { new: true, useFindAndModify: false }
        );
      });
     
return res.json(updatedfeedback)
     

  }
  else{
    return res.status(400).json({
        error : true,
        message:'invalid user'
  })
}
  }
 catch (error) {
      return res.status(400).json({
           error : true,
           message:error.message

      })
   
  }

}

exports.getFeedbackById = async (req, res) => {
    try {
        let feedback = await feedbackModel.findById(req.params.id);
        if (feedback) {
            return res.json(feedback)
        }
        
        else {
            throw new Error('feedback does\'t found')
        }


    } catch (error) {
        res.status(400).json(
            {
                error: true,
                message: error.message
            });
    }
}
exports.downloadfeedback = async (req, res) => {
    try {
        if (fs.existsSync(path.join(__dirname+ '/../public', 'uploads/')+req.params.path)) {
            return res.status(200).download(path.join(__dirname+ '/../public', 'uploads/')+req.params.path);
        }
        else {
            throw new Error('File does\'t exist.')
        }
    } catch (error) {
        res.status(400).json(
            {
                error: true,
                message: error.message
            });
    }    
}

exports.getAllFeedbacks = async (req, res) => {

    try {
        let feedbacks = await feedbackModel.find();
        if (feedbacks) {
            return res.json(feedbacks)
        }
        throw new Error('no feecback found ')
    } catch (error) {
        res.status(400).json(
            {
                error: true,
                message: error.message
            }
        )

    }


}

exports.updateFeedback = async (req, res) => {
    try {
        let feedback = await feedbackModel.findById(req.params.id);
        let uploadPath = "";
        if (req.files && req.files.Commentfile ) {
            let sampleFile = req.files.Commentfile;
            uploadPath = path.join(__dirname+ '/../public', 'uploads/') + Date.now().toString()+sampleFile.name;          
        
            err = sampleFile.mv(uploadPath,  function(err) {
              if (err){
                  this.err = err;
              }     
            });
            if (err){
                return res.status(400).send(err);
            }
            feedback.Commentfile = uploadPath.split(path.join(__dirname))[1];
        }
    
        if (feedback) {
            feedback = await feedbackModel.findByIdAndUpdate(feedback._id, req.body);

            return res.json(feedback)

        }
        throw new Error('feedback doesn\'t exits')
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })

    }


}

exports.deleteFeedback = async (req, res) => {
    console.log(req.params.id);
    try {
          let feedback = await feedbackModel.findByIdAndDelete({ _id:req.params.id })
            return res.json(feedback);
        

    } catch (error) {

        return res.status(400).json({
            error: true,
            message: error.message
        })

    }

}