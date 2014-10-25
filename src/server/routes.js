var handleError = require('./util.js').handleError;
var Things = require('./models/things');
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var things = new Things();

router.route('/api/things')
  .get(function (req, res, next) {
    things.getAllThings(function (err, docs) {
      if (err) handleError(err, res);
      res.json(docs);
    });
  })
  .post(function (req, res, next) {
    var doc = req.body;
    things.postThing(doc, function (err) {
      if (err) handleError(err, res);
      res.status(200).json(doc);
    });
  });

router.route('/api/things/:_id')
  .get(function (req, res, next) {
    var _id = req.params._id;

    things.getOneThing(_id, function (err, doc) {
      if (err) handleError(err, res);
      res.status(200).json(doc);
    });
  })
  .put(function (req, res, next) {
    var _id = req.params._id;
    var update = req.body;
    things.updateOneThing(_id, update, function (err, doc) {
      if (err) handleError(err, res);
      res.status(200).end('updated');
    });
  })
  .delete(function (req, res, next) {
    var _id = req.params._id;
    things.deleteOneThing(_id, function (err, doc) {
      if (err) handleError(err, res);
      res.status(200).end('deleted');
    });
  });


module.exports.router = router;
