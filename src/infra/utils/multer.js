import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/infra/upload/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, 
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) { 
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});