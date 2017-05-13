var mongoose = require('mongoose');
var db;

function pvtGetDB() {
    if (!db){
        //db = mongoose.connect('mongodb://localhost/annotationDb');
        db = mongoose.connect('mongodb://annotations:1q2w3e4r@ds113871.mlab.com:13871/annotations');
    }

    return db;
}

function pvtGetMongoose() {
    return mongoose;
}

module.exports = {
    getDB: pvtGetDB,
    getMongoose: pvtGetMongoose
}