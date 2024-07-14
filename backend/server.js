const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aditya@123',
  database: 'id',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// API routes
app.post('/api/users', upload.single('photo'), (req, res) => {
  const { name, bloodGroup, mobile, fromStation, toStation, licenseNo, vehicleNo, address, vehicleModel } = req.body;
  const photo = req.file.filename;

  const query = 'INSERT INTO users (name, bloodGroup, mobile, fromStation, toStation, licenseNo, vehicleNo, address, vehicleModel, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, bloodGroup, mobile, fromStation, toStation, licenseNo, vehicleNo, address, vehicleModel, photo], (err, results) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send(err);
    }
    res.status(201).send('User added successfully!');
  });
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
