/**
 * Created by zhangmike on 16/10/18.
 */
var path = require('path');

var babel = require('rollup-plugin-babel');
var eslint = require('rollup-plugin-eslint');
var commonjs = require("rollup-plugin-commonjs");
var env = require('./env');
var buble = require('rollup-plugin-buble');
var string = require('rollup-plugin-string');
var postcss = require('rollup-plugin-postcss');
var entry = '';
if (['bui','production', 'dev'].indexOf(env) != -1) {
    entry = '../src/index.js';
} else if (env === 'bjs') {
    entry = '../src/jsframework/index.js';
} else if (env === 'btool') {
    entry = '../src/tools/index.js';
}

var config = {
    entry: path.join(__dirname, entry),
    moduleName: 'GMP',
    format: 'umd',
    plugins: [
        commonjs(),
        string({
            include: ['**/**/*.html']
        }),
        /*postcss({
            extensions: ['.css']
        }),*/
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['es2015-rollup','stage-0'],
            plugins: ['transform-class-properties', "transform-object-assign"]
        })/*,
        eslint()*/
    ]
};
if (['bui','production', 'dev', 'bjs'].indexOf(env) != -1) {
    module.exports = Object.assign({
        dest: path.join(__dirname, '../dist/gmp.js')
    }, config);
} else {
    module.exports = config;
}
