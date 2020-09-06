const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

//Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//app.get('/', (req, res) => res.send('API is Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth/dashboardCount', require('./routes/api/auth'));

//Serve static assets in production.
if (process.env.NODE_ENV==='production') {
    // set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));