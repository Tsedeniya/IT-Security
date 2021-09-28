const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter:  (req, file, cb) => {

    if (file.mimetype == "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  }
  
  
  
  
});


module.exports = upload;


