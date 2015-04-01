var models = require("../../models/models");
var Person = models.Person;
var Place = models.Place;
var db = require("../../config/db");
describe("models", function() {
  var ids = {};
  beforeEach(function(done) {
    db.connect(function() {
      models.seed(function(err, new_york, paris, london) {
        ids.new_yorkId = new_york._id;
        ids.parisId = paris._id;
        ids.londonId = london._id;
        done();
      });
    });
  });
});
 
  
  describe("Place", function() {
    describe("getOneByName", function() {
      var place;
      beforeEach(function(done) {
        Place.getOneByName("New York", function(err, _place) {
          place = _place;
          done();
        });
      });

      it("is New York", function() {
        expect(place.name).toEqual("New York");
      });
    }); //end of getOneByName
    describe("getOneById", function() {
      var place;
      beforeEach(function(done) {
        Place.getOneById(ids.new_yorkId, function(err, _place) {
          place = _place;
          done();
        });
      });
      it("is New York", function() {
        expect(place.name).toEqual("New York");
      });
    });
    describe("getAll", function() {
      var places;
      beforeEach(function(done) {
        Place.getAll(function(err, _places) {
          places = _places.map(function(place) {
            return place.name;
          });
          done();
        });
      });
      it("should return all places", function() {
        expect(places).toEqual(["New York, Paris, London"]);
      });

 afterEach(function(done) {
    db.disconnect(function() {
      done();
    });
  });
    });
});