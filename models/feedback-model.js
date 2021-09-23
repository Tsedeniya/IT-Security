const mongoose = require ('mongoose');

const feedbackSchema =  mongoose.Schema({

    Name : {type:String , default:'',required:true},
    email: { type: String, unique: true, trim: true, lowercase: true, required: true},
    Comment:{type:String,default:'',required:true},
    
    created_at:{type:Date},
    
   
   
});
module.exports = mongoose.model('feedback',feedbackSchema);