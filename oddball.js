var crypto = require("crypto");
var zlib = require("zlib");
var fs = require("fs");

var Oddball = function(algorithm, digest) {
  this.algorithm = algorithm || "sha256";
  this.digest = digest || "hex";
  
  this.data = {};
  this.refs = {};
}

Oddball.prototype.hash = function(data) {
  return crypto.createHash(this.algorithm).update(data).digest(this.digest);
}

Oddball.prototype.store = function(str) {
  var hash = this.hash(str);
  this.data[hash] = str;
  return hash;
};

Oddball.prototype.storeObject = function(obj) {
  return this.store(JSON.stringify(obj));
}

Oddball.prototype.retrieve = function(hash) {
  return hash ? this.data[hash] || this.data[this.refs[hash]] : null;
}

Oddball.prototype.retrieveObject = function(hash) {
  return JSON.parse(this.retrieve(hash));
}

Oddball.prototype.updateRef = function(ref, value) {
  this.refs[ref] = value;
}

Oddball.prototype.write = function(filename, cb) {
  zlib.gzip(JSON.stringify(this), function(err, res) {
    if(err) throw err;
    fs.writeFile(filename, res, cb);
  });
}

Oddball.read = function(filename, cb) {
  fs.readFile(filename, null, function(err, data) {
    if(err) throw err;
    zlib.gunzip(data, function(err, data) {
      var o = JSON.parse(data.toString())
      o.__proto__ = Oddball.prototype;
      if(cb) cb(o);
    });
  });
}

module.exports = Oddball;