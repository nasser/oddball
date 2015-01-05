Oddball
=======

A simple content addressable data store, inspired by the core ideas behind git.

## Status
Experimental. Don't use for anything mission critical for a while.

## Usage
Oddball does very little. It stores and retrieves data, and reads and writes to disk. That's about it. It is intended as a platform to build more powerful abstractions on.

### Create new store
Create stores by specifying what hash algorithm and what digest encoding to use.

```javascript
var Oddball = require("./oddball");
var odd = new Oddball("sha1", "hex");
```

Supported algorithms/encodings come from [Node's APIs](http://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm). `'md5'`, `'sha256'`, and `'sha512'` are generally available as hash algorithms, and `'hex'`, `'binary'`, and `'base64'` are available as digest encodings. The default is `'sha1'` and `'hex'`, like git.

### Store string
```javascript
odd.store("Hello, world!")
// '0a0a9f2a6772942557ab5355d76af442f8f65e01'
```

### Store object
```javascript
odd.storeObject({message: "Hello, world!", traditional:true})
// '0c41b640e0ea2d5a4cc3395a5c930a3c52ab7712'
```

### Retrieve string
```javascript
odd.retrieve("0a0a9f2a6772942557ab5355d76af442f8f65e01")
// 'Hello, World!'
odd.retrieve("0c41b640e0ea2d5a4cc3395a5c930a3c52ab7712")
// '{"message":"Hello, world!","traditional":true}'
```

### Retrieve object
```javascript
var o = odd.retrieveObject("0c41b640e0ea2d5a4cc3395a5c930a3c52ab7712")
o.message
// 'Hello, world!'
o.traditional
// true
```

### Use Refs
```javascript
odd.updateRef("head", "0c41b640e0ea2d5a4cc3395a5c930a3c52ab7712");
odd.retrieveObject("head");
// { message: "Hello, world!", traditional: true }
```

### Write to disk
```javascript
odd.write("hello-world.odd")
```

### Read from disk
```javascript
Oddball.read("hello-world.odd", function(odd) {
  odd.retrieveObject("0c41b640e0ea2d5a4cc3395a5c930a3c52ab7712")
  // { message: "Hello, world!", traditional: true }
});
```

## License
Copyright © 2015 Ramsey Nasser

Licensed under the The MIT License.
