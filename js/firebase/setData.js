const { name } = require("./firebase_connect");
const firebase = require("./firebase_connect");

module.exports = {
    saveData: function (req, callback) {
        let username = req.username;
        var flag = 0;

        var ref = firebase.database().ref("users/");
        ref.orderByChild("name").equalTo(username).limitToFirst(1).on("value", function (snapshot) {
            if (req.username == snapshot.child(username + "/name").val() && req.password == snapshot.child(username + "/password").val()) {
                flag = 1;
            }
        });
        if(flag==1){
            callback(null, { "statuscode": 400, "message": "User Name Already Exists" });
        }
        
        if (flag == 0) {
            firebase.database().ref("users/" + username).set({
                name: req.username,
                email: req.email,
                password: req.password
            });

            callback(null, { "statuscode": 200, "message": "Inserted" });
        }

    },

    retrieveData: function (req, callback) {
        var ref = firebase.database().ref("users/");
        let username = req.username;
        ref.orderByChild("name").equalTo(username).limitToFirst(1).on("value", function (snapshot) {
            if (req.username == snapshot.child(username + "/name").val() && req.password == snapshot.child(username + "/password").val()) {
                callback(null, { "statuscode": 200, "message": req.username });
            }
            else {
                callback(null, { "statuscode": 401 });
            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    },
    saveEventreg: function (req, callback) {
        let ename = req.ename;
        let reg = req.reg;
        firebase.database().ref("Event registrations/" + ename + "/" + reg).set({
            name: req.name,
            register_no: req.reg,
            attendance: req.attd,
        });

        callback(null, { "statuscode": 200, "message": "Inserted" });
    },

    saveCoursereg: function (req, callback) {
        let cname = req.cname;
        let name = req.name;
        firebase.database().ref("Course registrations/" + cname + "/" + name).set({
            name: req.name,
            email: req.email
        });

        callback(null, { "statuscode": 200, "message": "Inserted" });
    },

    retrieveCoursedata: function (req, callback) {

        let username = req.username;
        var arr = [];
        var cname = ["Python Programming Masterclass", "AI:Learn how to build an AI", "ML Fundamentals Using Tensorflow", "Flutter", "Android App development with kotlin", "Complete Vue JS Developer Course"];
        for (var i = 0; i < cname.length; i++) {
            var ref = firebase.database().ref("Course registrations/" + cname[i]);
            ref.orderByChild("name").equalTo(username).on("value", function (snapshot) {

                if (snapshot.child(username + "/name").val() == username) {
                    arr.push(i);
                }

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

        }
        callback(null, { "statuscode": 200, "message": arr });
        console.log(arr);
    },


    saveInternshipappli: function (req, callback) {
        let iins = req.iins;
        let iname = req.iname;
        let name = req.name;
        let ino = req.ino;
        if (ino == 2) {
            firebase.database().ref("Internship applications/" + iins + "-" + iname + "/" + name).set({
                name: req.name,
                email: req.email,
                test_date: req.test_date,
                experience: req.experience,
                Android: req.android,
                Flutter: req.flutter,
                java: req.java,
                CGPA: req.cgpa
            });
        } else {
            firebase.database().ref("Internship applications/" + iins + "-" + iname + "/" + name).set({
                name: req.name,
                email: req.email,
                test_date: req.test_date,
                experience: req.experience,
                html: req.html,
                css: req.css,
                javascript: req.javascript,
                sql: req.sql,
                CGPA: req.cgpa
            });
        }


        callback(null, { "statuscode": 200, "message": "Inserted" });
    },

    retrieveInternshipdata: function (req, callback) {
        let username = req.username;
        var arr = [];
        var cname = ["AK Technologies-Full Stack Development", "Hindel Solutions-Android-Flutter App Development", "UPE Laboratories-Front-end Web Development"];

        for (var i = 0; i < cname.length; i++) {
            var ref = firebase.database().ref("Internship applications/" + cname[i]);
            ref.orderByChild("name").equalTo(username).on("value", function (snapshot) {

                if (snapshot.child(username + "/name").val() == username) {
                    arr.push(i);
                }

            });

        }
        callback(null, { "statuscode": 200, "message": arr });
        console.log(arr);
    },

    retrieveInternshipappli: function (req, callback) {
        let username = req.username;
        var arr = [];
        var karr = [];
        var cname = ["AK Technologies-Full Stack Development", "Hindel Solutions-Android-Flutter App Development"];

        var ref = firebase.database().ref("Internship applications/" + cname[0]);
        ref.orderByChild("name").on("value", function (snapshot) {
            console.log(snapshot.val());

            snapshot.forEach(function (childSnapshot) {
                arr.push(childSnapshot.val());
            });

        });
        var ref = firebase.database().ref("Internship applications/" + cname[1]);
        ref.orderByChild("name").on("value", function (snapshot) {
            console.log(snapshot.val());

            snapshot.forEach(function (childSnapshot) {
                karr.push(childSnapshot.val());
            });

        });

        callback(null, { "statuscode": 200, "message": arr, "message2": karr });
        console.log(arr);
    },
}