const multer = require("multer")

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".jpg");
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports.send = (req, res, next) => {
    try{return upload.single('images')(req, res, () => {
        // Remember, the middleware will call it's next function
        // so we can inject our controller manually as the next()
    
        if (!req.file) return res.json({ error: "wrong file type" })
        next()
      })}
    catch(err){
     return res.json({ error: err})
        
    }
  }
