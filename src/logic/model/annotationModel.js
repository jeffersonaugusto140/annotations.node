var mongoConn = require('../db/mongoConn');
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
        name: String
    });

var annotationSchema = mongoose.Schema({
        title: String,
        description: String,
        tags: [tagSchema]
    });

function getSample() {
    return { 
        title: 'Sample',
        description: 'Description sample. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus enim, tincidunt nec lorem id, ornare sagittis arcu. Donec elit neque, volutpat non justo non, luctus posuere turpis. Phasellus vulputate, nulla sit amet auctor fringilla, elit mauris vehicula libero, sit amet suscipit nibh quam eu turpis. Pellentesque elit nisi, mattis sed turpis vitae, aliquet ultrices sapien. Nullam felis metus, porttitor eu cursus sit amet, faucibus ac libero. Duis ultricies sem id enim dictum, vel sodales libero varius. Cras eleifend massa sed neque ultrices, non convallis felis laoreet. Sed nec volutpat nisi, a luctus quam.',
        tags: [{
            name: 'Tag 1'
        },{
            name: 'Tag 2'
        }]
    };
}

function addSampleIfNotExists() {
    getCollection().count({}, function(err, count){
        if (err) {
            throw err;
        }

        if (count === 0) {
            add(getSample());   
        }
    });
}

function remove(id, callback) {
    getCollection().findOne({ '_id': id}, function(err, annotation){
        if (err) {
            throw err;
        }
        
        annotation.remove();
        
        callback();
    });
}

function getCollection() {
    var db = mongoConn.getDB();
    var model = db.model('annotation', annotationSchema);
    return model;
}

function add(newAnnotation) {
    getCollection().create(newAnnotation, function (err, annotation) {
        if (err) {
            throw err;
        }
    });
}

function udpate(newAnnotation) {
    getCollection().create(newAnnotation, function (err, annotation) {
        if (err) {
            throw err;
        }
    });
}

function findAll(callback) {
    return getCollection().find({}, function (err, annotations) {
        if (err) {
            throw err;
        }

        var res = annotations.map(function(anno) { 
            var temp = anno._doc;

            temp.tags =
                temp.tags.map(function (tag) {
                   return tag._doc; 
                });

            return temp;
         })

        callback(res);
    })
}

module.exports = {
    getCollection: getCollection,
    addSampleIfNotExists: addSampleIfNotExists,
    add: add,
    findAll: findAll,
    remove: remove,

}