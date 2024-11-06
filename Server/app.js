const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/router.auth')

const app = express();

// Middleware
app.use(cors());
app.use(express.json()) ;

// api routes.
app.use('/api/v1', authRouter)

module.exports = app;
