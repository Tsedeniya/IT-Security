const Joi = require('joi');
const feedbackModel = require('../models/feedback-model');
const userModel = require('../models/user-model');


exports.create = async(req,res)=>{
  try {
    var userId = req.params.id
    let updatedfeedback = new feedbackModel({
        Name:req.body.Name,
        email:req.body.email,
        Comment:req.body.Comment,
        
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
     

  } catch (error) {
      res.status(400).json({
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

        if (feedback) {
            feedback = await feedback.updateOne({ _id: user._id }, req.body);

            return res.json(feedback)

        }
        throw new Error('user doesn\'t exits')
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