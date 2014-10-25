var mongoDB = require('../config').mongoDB;
var MongoClient = require('mongodb').MongoClient;
var colName = 'things';
var ObjectID = require('mongodb').ObjectID;

module.exports = function Things() {

  function connect(cb) {
    MongoClient.connect(mongoDB, function (err, db) {
      if (err) cb(err, null);
      console.log('Connected to: ' + mongoDB);
      var collection = db.collection(colName);
      cb(null, collection);
    })
  }

  function postThing(doc, cb) {
    connect(function (err, collection) {
      collection.insert(doc, cb);
    })
  }

  function getAllThings(cb) {
    connect(function (err, collection) {
      if (err) {
        throw err;
      } else {
        collection.find().toArray(cb);
      }
    });
  }

  function getOneThing(_id, cb) {
    var q = {_id: new ObjectID(_id)};
    connect(function(err, collection) {
      if (err) cb(err, null);
      collection.findOne(q, cb);
    });
  }

  function deleteOneThing (_id, cb) {
    var q = {_id: new ObjectID(_id)};
    connect(function(err, collection) {
      if (err) cb(err, null);
      collection.remove(q, cb);
    });
  }

  function updateOneThing (_id, update, cb) {
    var q = {_id: new ObjectID(_id)};
    connect(function(err, collection) {
      if (err) cb(err, null);
      collection.update(q, update, cb);
    });
  }

  return {
    postThing: postThing,
    getAllThings: getAllThings,
    getOneThing: getOneThing,
    deleteOneThing: deleteOneThing,
    updateOneThing: updateOneThing
  };
};
