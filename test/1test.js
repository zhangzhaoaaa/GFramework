/**
 * Created by zhangmike on 16/10/12.
 */
var add = require('./add');
var expect = require('chai').expect;
var BaseClass = require('../src/base/BaseClass');
describe('add unit test.', function(){
    it('2 + 3 = 5', function(){
        var result = add(2, 3);
        expect(result).to.equal(5);
        var base = new BaseClass();
        console.log(base.CLASS_NAME);
    });
});