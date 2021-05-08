const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const ofirebase = require("./firebase/setData");
const cors = require("cors");
app.use(cors());
var router = express.Router();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));

router.post("/savedata/",function(req,res){
    ofirebase.saveData(req.body,function(err,data){
        res.send(data);
    });
});

router.post("/eventregistration/",function(req,res){
    ofirebase.saveEventreg(req.body,function(err,data){
        res.send(data);
    });
});

router.post("/courseregistration/",function(req,res){
    ofirebase.saveCoursereg(req.body,function(err,data){
        res.send(data);
    });
});

router.post("/courseregistrationcheck/",function(req,res){
    ofirebase. retrieveCoursedata(req.body,function(err,data){
        res.send(data);
    });
});

router.post("/login/",function(req,res){
    ofirebase.retrieveData(req.body,function(err,data){
        res.send(data);
    });
});

router.post("/internships/",function(req,res){
    ofirebase.saveInternshipappli(req.body,function(err,data){
        res.send(data);
    });
});

router.post("/internshipscheck/",function(req,res){
    ofirebase.retrieveInternshipdata(req.body,function(err,data){
        res.send(data);
    });
});

router.post("/internshipsdisplay/",function(req,res){
    ofirebase.retrieveInternshipappli(req.body,function(err,data){
        res.send(data);
    });
});


app.use('/api',router);
app.listen(port);