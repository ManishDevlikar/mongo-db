const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

router.get('/', (req, res) => {
    res.render("task/addOrEdit", {
        viewTitle: "Insert Task",
        task: req.body
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var task = new Task();
    task.taskNo = req.body.taskNo;
    task.descriptionNo = req.body.descriptionNo;
    task.save((err, doc) => {
        if (!err)
            res.redirect('task/list');
        else {
            console.log('Error During the insertion' + err);
        }
    });
}


function updateRecord(req, res) {
    Task.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('task/list'); }
        else {
            console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {

    Task.find((err, docs) => {
        if (!err) {
            res.render("task/list", {
                list: docs
            });
        } else {
            console.log('error in list' + err);
        }
    });
});


router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("task/addOrEdit", {
                viewTitle: "Update Task",
                task: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/task/list');
        }
        else { console.log('Error in task delete :' + err); }
    });
});


module.exports = router;