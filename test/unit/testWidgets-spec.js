/**
 * Created by zhangmike on 16/10/21.
 */
import GMP from 'GMP';
var expect = require('chai').expect;
describe('GMPWidgets test.', ()=> {
    it('GMP exists', ()=> {
        expect(GMP instanceof Object).to.equal(true);
    });
});