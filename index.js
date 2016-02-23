var traverse = require('traverse');

module.exports = function(oldObj, newObj) {
  var olds = kv(oldObj);
  var news = kv(newObj);

  var operations = [];

  Object.keys(olds).forEach(function(k) {
    if (!(k in news)) {
      var op = {
        op: 'remove',
        path: k,
      };
      operations.push(op);
    }
  });

  Object.keys(news).forEach(function(k) {
    var op = {
      op: undefined,
      path: k,
      value: (typeof news[k] === 'string') ? news[k] : JSON.stringify(news[k]),
    };

    if (!(k in olds)) {
      op.op = 'add';
    } else if (olds[k] !== news[k]) {
      op.op = 'replace';
    }

    if (op.op) {
      operations.push(op);
    }
  });

  return operations;
};

// converts a object to {key(=JSON-Poiner): value...}
function kv(obj) {
  return traverse(obj).reduce(function(acc, v) {
    if (this.isLeaf) {
      if (!Array.isArray(v) && !isObject(v)) { // ignore empty array and object
        var path = "/" + this.path.join("/");
        acc[path] = v;
      }
    }

    return acc;
  }, {});
}

function isObject(obj) {
  return !!obj && (obj.constructor === Object);
}
