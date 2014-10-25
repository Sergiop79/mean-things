var Things = require('../src/server/models/things');
var expect = require('chai').expect;

/*
 * Globals
 */
var _id;
var oThing;
var doc;

describe('Things Model', function () {
  beforeEach(function () {
    oThing = new Things();
  });


  it('should POST a thing without error', function (done) {
    var myDoc = {
      name: 'Another thing'
    };
    oThing.postThing(myDoc, function (err, doc) {
      if (err) throw err;
      doc = doc[0];
      _id = doc._id;
      expect(doc.name).to.be.equal('Another thing');
      done();
    });
  });

  it('should GET all things without error', function (done) {
    oThing.getAllThings(function (err, docs) {
      if (err) throw err;
      expect(docs).to.be.a('array');
      done();
    });
  });

  it('should GET a thing by _id without error', function (done) {
    oThing.getOneThing(_id, function (err, doc) {
      if (err) throw err;
      done();
    });
  });

  it('should UPDATE a thing by _id without error', function (done) {
    var update = {
      $set: {
        name: 'Another thing UPDATED'
      }
    };

    oThing.updateOneThing(_id, update, function (err, result) {
      if (err) throw err;
      expect(result).to.be.equal(1);
      done();
    });
  });

  it('should DELETE a thing by _id without error', function (done) {
    oThing.deleteOneThing(_id, function (err, doc) {
      if (err) throw err;
      done();
    });
  });

  it('should get all things without error', function (done) {
    oThing.getAllThings(function (err, collection) {
      if (err) throw err;
      expect(collection).to.be.a('array');
      done();
    });
  });

  afterEach(function () {
    doc = null;
  });

});
