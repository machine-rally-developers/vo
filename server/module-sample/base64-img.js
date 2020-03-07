var fs = require('fs');
var path = require('path');

function base64(filename, data) {
  var extname = path.extname(filename).substr(1);
  extname = extname || 'png';

  if (extname === 'svg') {
    extname = "svg+xml"
  }
  
  return 'data:image/' + extname + ';base64,' + data.toString('base64');
}

function img(data) {
  var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  var match = data.match(reg);
  var baseType = {
    jpeg: 'jpg'
  };

  baseType['svg+xml'] = 'svg'

  if (!match) {
    throw new Error('image base64 data error');
  }

  var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: '.' + extname,
    base64: match[2]
  };
}

/**
 * @description
 * Get image file base64 data
 * @example
 * base64Img.base64('path/demo.png', function(err, data) {})
 */
exports.base64 = function(filename, callback) {
  if (!callback) callback = util.noop;

  fs.readFile(filename, function(err, data) {
    if (err) return callback(err);

    callback(null, base64(filename, data));
  });
};

/**
 * @description
 * The api same as base64, but it's synchronous
 * @example
 * var data = base64Img.base64Sync('path/demo.png');
 */
exports.base64Sync = function(filename) {
  var data = fs.readFileSync(filename);

  return base64(filename, data);
};