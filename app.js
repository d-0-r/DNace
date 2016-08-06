"use strict";

const express = require('express');
// const router = express.Router();
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.static('src'));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.post('/', (req, res) => {
    let sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    sampleFile = req.files.uploadedFASTA;
    sampleFile.mv(path.join(__dirname + '/uploadedFiles/' + sampleFile.name), function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/results');
        }
    });
});

app.listen(3000);
