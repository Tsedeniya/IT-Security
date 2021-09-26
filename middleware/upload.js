const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb)  {

    if (file.mimetype == "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  }
  
  
  
  
});


module.exports = upload;


