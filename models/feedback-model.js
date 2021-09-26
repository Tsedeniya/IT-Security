const mongoose = require ('mongoose');

const feedbackSchema =  mongoose.Schema({

    Name : {type:String , default:'',required:true},
    email: { type: String,  trim: true, lowercase: true, required: true},
    Comment:{type:String,default:'',required:true},
    Commentfile:{type:String,default:''},
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     },
    
    created_at:{type:Date},
    
   
   
});
module.exports = mongoose.model('feedback',feedbackSchema);