'use strict'

const multers  = require('multer');


const storage = multers.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/temp/');
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + file.originalname.replace(' ', '_'));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const excelFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("excel") ||
      file.mimetype.includes("spreadsheetml")
    ) {
      cb(null, true);
    } else {
      cb("Please upload only excel file.", false);
    }
  };
const upload = multers({ storage: storage });

module.exports = upload;