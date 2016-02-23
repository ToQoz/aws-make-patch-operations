var test = require('tape');

var makePatchOperations = require('..');

test('delete/add', function(t) {
  t.plan(1);

  var operations = makePatchOperations({a: '_a'}, {b: '_b'})
  t.deepEqual(operations, [
    {path: '/a', op: 'remove'},
    {path: '/b', op: 'add', value: '_b'},
  ]);
});

test('replace', function(t) {
  t.plan(1);

  var operations = makePatchOperations({a: '_a'}, {a: '_b'})
  t.deepEqual(operations, [
    {path: '/a', op: 'replace', value: '_b'},
  ]);
});

test('with numbers', function(t) {
  t.plan(1);

  var operations = makePatchOperations({a: 1}, {a: 2})
  t.deepEqual(operations, [
    {path: '/a', op: 'replace', value: '2'},
  ]);
});

test('with booleans', function(t) {
  t.plan(1);

  var operations = makePatchOperations({a: false}, {a: true})
  t.deepEqual(operations, [
    {path: '/a', op: 'replace', value: 'true'},
  ]);
});

test('with nested objects', function(t) {
  t.plan(1);

  var operations = makePatchOperations({a: {_a: '_x'}, b: {_b: 2}}, {a: {_a: '_y'}, b: {_b: 3}})
  t.deepEqual(operations, [
    {path: '/a/_a', op: 'replace', value: '_y'},
    {path: '/b/_b', op: 'replace', value: '3'},
  ]);
});

test('nop', function(t) {
  t.plan(1);

  var operations = makePatchOperations({a: {_a: '_x'}, b: 2}, {a: {_a: '_x'}, b: 2})
  t.deepEqual(operations, []);
});
