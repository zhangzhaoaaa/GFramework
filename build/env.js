/**
 * Created by zhangmike on 16/10/18.
 */
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));

module.exports = argv.env || 'production';
