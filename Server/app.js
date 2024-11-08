const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/router.auth')
const postRouter = require('./routes/router.post')

const app = express();

// Middleware
app.use(cors());
app.use(express.json()) ;

// api routes.
app.use('/api/v1', authRouter)
// post route
app.use('/api/v1',postRouter)


module.exports = app;
