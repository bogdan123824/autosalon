const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
require("dotenv").config();
const bodyParser = require('body-parser');
const { initDatabase, closeDatabase } = require('./config/db');

initDatabase();

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  })
  
  app.use(cors({
      origin: '*', 
      credentials: true,
      optionsSuccessStatus: 200
  }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json({limit: '50mb'}));


const carRoutes = require('./routes/carRoutes');

app.use('/', carRoutes);


const PORT = 8000;

const server = app.listen(PORT, () => {
    console.log(`Server running on link: http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    closeDatabase();
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    closeDatabase();
    console.log('HTTP server closed');
  });
});