const mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
    taskNo: {
        type: String,
        required: 'This field is required.'
    },
    descriptionNo: {
        type: String
    }
});
mongoose.model('Task', taskSchema);