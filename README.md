# make-patch-operations

makes [patchOperations](http://docs.aws.amazon.com/sdkforruby/api/Aws/APIGateway/Types/PatchOperation.html) from 2 objects.

## Usage

example.js:

```javascript
var makePatchOperations = require('aws-make-patch-operations');

var oldObj = {
  a: {_a: '_x'},
  b: {_b: 2}
};

var newObj = {
  a: {_a: '_y'},
  b: {_b: 3}
};
var operations = makePatchOperations(oldObj, newObj)
console.dir(operations);
```

```
$ node ./example.js
[ { op: 'replace', path: '/a/_a', value: '_y' },
  { op: 'replace', path: '/b/_b', value: '3' } ]
```

## Supported operations

- add
- remove
- replace
