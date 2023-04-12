const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const dbconnection = require('./dbconnection');
const cors = require('cors');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// env configuration
dotenv.config();

app.use(cors());
//Connect to Database
dbconnection();
//Middleware
app.use(express.json());

app.use(flash());
app.use(cookieParser());




//import routes
const UserCrud = require('./routes/UserCrud');
const InternshipCrud = require('./routes/InternshipCrud');
const CandidateCrud = require('./routes/CandidateCrud');
const auth = require('./routes/auth');



app.use('/crudapi/', UserCrud);
app.use('/crudapi/internship/', InternshipCrud);
app.use('/crudapi/candidate/', CandidateCrud);
app.use('/crudapi/auth/', auth);


// port
app.listen(3000,() => console.log('Server up and running'));
