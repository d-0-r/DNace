"use strict";

const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const DnaAnalyzer = require('./file_processing/bio').DnaAnalyzer;

const app = express();

app.use(express.static('src'));
app.use(fileUpload());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


/****************************
******** Routing ************
****************************/

app.post('/', (req, res) => {
    let sampleFile;
    if (!req.files) { // user chooses to paste sequence
        let pastedFASTA = req.body.pastedFASTA;
        const uploadedDNA = new DnaAnalyzer();
        uploadedDNA.parseFASTA(pastedFASTA, () => {
          uploadedDNA.analyzeFASTA(uploadedDNA.sequence);
          app.locals.dnaInfo = uploadedDNA;
        });

        res.redirect('/results');
        return;
    }

    sampleFile = req.files.uploadedFASTA; // name attribute in form from ./dev/js/components/Upload.js

    sampleFile.mv(path.join(__dirname + '/uploadedFiles/' + sampleFile.name), function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            const uploadedDNA = new DnaAnalyzer();
            uploadedDNA.readFASTA('../uploadedFiles/', sampleFile.name, () => {
              app.locals.dnaInfo = uploadedDNA;
              console.log(app.locals)
            });
            res.redirect('/results');
        }
    });
});

app.get('/results', (req, res) => {
  res.render('results', { analyzedFASTA: app.locals.dnaInfo });
});

app.listen(process.env.PORT || 3000);
