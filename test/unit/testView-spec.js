/**
 * Created by zhangmike on 16/10/21.
 */
import GMP from 'GMP';
import chai from 'chai';
var expect = chai.expect;
describe('GMPView test ', ()=> {

    it('jquery exists', ()=> {
        expect($).to.equal(jQuery);
    });
    it('GMP exists', ()=> {
        expect(GMP).to.be.a("function");
    });
    it('GMP instance null options', ()=> {
        let gmp = new GMP();
        expect(gmp instanceof GMP).to.equal(true);
        expect(gmp._uid).to.match(/^g/);
        expect(gmp.el).to.be.an.instanceOf(Node);
        expect(gmp.$el).to.be.an.instanceOf(jQuery);
        expect(gmp._eventsMapList).to.be.empty;
        expect(gmp.data).to.be.empty;
        expect(gmp.events).to.be.empty;
        expect(gmp.els).to.be.a("undefined");
        expect(gmp.init).to.be.a("undefined");
    });

    it('GMP instance options', ()=> {
        var script = '<script id="tmpl" type="text/html"><%=name%></script>';
        $('body').append('<div id="div"></div>').append(script);
        let gmp = new GMP({
            el: '#div',
            data: {
                name: 'zeromike',
                location: 'beijing'
            },
            template:GMP.template('tmpl'),
            events: {
                'click #id': 'open'
            },
            open: function () {
                return 'open';
            },
            init: function () {
                this.$el.html(this.template(this.data));
                return 'test';
            }
        });
        gmp.on('gmp_event', function (arg) {
            expect('gmp_event_test').to.equal(arg);
        });

        expect(gmp instanceof GMP).to.equal(true);
        expect(gmp._uid).to.match(/^g/);
        expect(gmp.$el).to.be.an.instanceOf(jQuery);
        expect(gmp.el.id).to.equal('div');
        expect(gmp._eventsMapList[gmp._uid + "gmp_event"]).to.be.a('array');
        gmp.trigger('gmp_event', 'gmp_event_test');
        expect(gmp.data).to.have.property('name', 'zeromike');
        expect(gmp.data.location).to.equals('beijing');
        expect(gmp.events).to.have.property('click #id', 'open');
        expect(gmp.open()).to.equal('open');
        expect(gmp.els).to.be.a("undefined");
        expect(gmp.init()).to.equals('test');
        expect($('div').text().trim()).to.equals('zeromike');
    });
});