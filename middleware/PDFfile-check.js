const route = require('express').Router();

const PDFcheck = () => (req, res, next) => {
    if (!req.file) {
        return res.status(400).send("Please upload a file");
      }
    
      const file_type = req.file.mimetype;
      if (file_type === "application/pdf") {
        next();
      } else {
        return res.status(400).send( "Please upload a PDF file" );
      }
}



module.exports= PDFcheck ;