const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    full_name :{type:String,default:'',required:true},
    username: { type: String, default: '',required:true },
    email: { type: String, unique: true, trim: true, lowercase: true, required: true},
    password: { type: String, required: true, minlength: 8, maxlength: 128,required:true},
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roles' }],
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],
    feedback:{type:mongoose.Schema.Types.ObjectId,
      ref:"feedback"
   },
    last_login: { type: Date },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
})
userSchema.pre('save', function preSave(next) {
  let model = this

  model.hashPasswd(model.password, (err, hash) => {
      model.password = hash
      next()
  })
})
userSchema.method({
    verifyPassword(passwd) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(passwd, this.password, (err, isMatch) => {
            if (err) {
              return reject(err)
            }
      
            resolve(isMatch)
          })
        })
      },
      hashPasswd(passwd, cb) {
        let createHash = (err, hash) => {
          if (err) {
            return cb(err)
          }
      
          cb(null, hash)
        }
      
        let generateSalt = (err, salt) => {
          if (err) {
            return cb(err)
          }
      
          // Hash the password using the generated salt
          bcrypt.hash(passwd, salt, createHash)
        }
      
        // Generate a salt factor
        bcrypt.genSalt(12, generateSalt) 
      }
})
 

// plugins
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('user',userSchema);