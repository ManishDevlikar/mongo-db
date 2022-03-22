const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TaskDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded') }
    else { console.log('error in DB connection:' + err) }
});

require('./task.model');