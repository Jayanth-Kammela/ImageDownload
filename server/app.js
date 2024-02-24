const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const uploadModel = require('./model/upload.model');
const dotenv = require('dotenv')
const cors = require('cors');
const { dbConnect } = require('./db/db');

app.use(cors());

dotenv.config()


const storage = multer.diskStorage({


  destination: (req, file, cb) => {
    cb(null, 'Upload')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  }
})

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "text/plain" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb("JPEG and PNG only supported", false);
  }
};

const upload = multer({ storage: storage, limts: { fileSize: 1024 * 1024 * 5, }, fileFilter: fileFilter });
//5mb

dbConnect()

app.use(express.static(path.join(__dirname, './Upload')));

app.get('/', async (req, res) => {
  try {
    const data = await uploadModel.find()
    return res.status(200).send(data);
  } catch (error) {

  }
})

app.post('/post', upload.single('File'), async (req, res) => {
  const file = req.file.filename.toString()
  console.log(req.file);
  try {
    const users = new uploadModel({ File: file });
    users.save()
    return res.status(200).send(users);
  } catch (error) {
    return res.status(422).json(error);
  }

})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`runing on ${port}`);
})
