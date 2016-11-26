/**
 * Created by zhangmike on 16/10/12.
 */

// widgets
/*var Person = GMP.Class(GMP.BaseClass, {
    data: {
        name: 'zeromike',
        location: 'Beijing'
    },
    initialize: function () {
        this.components
        // console.log("initialize....", arguments, _.assign(this.data, arguments[0]));
    },
    CLASS_NAME: 'Person'
})
var person = new Person({
    gender: 'male'
});

console.log(person.CLASS_NAME);*/

//core
var state = {
    userId: '123',
    loginDate: '2016-10-18'
};
var g = new GMP.GMPX(state);
console.log(g);

new GMP({
    appName: 'index',
    data: {
        name: 'zeromike',
        location: 'Beijing'
    },
    el: '#container',
    template: {
        listTemplate: template('list'),
        buttonTemplate: template('buttons')
    },
    init: function() {
        console.log("init.....", g.state.userId);
        g.state.userId = '5678';
        var data = {
            title: '标签',
            list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
        };
        this.data.data = data;
        GMP.GMPEvents.on("GMPEvents_showme", function() {
            console.log("on showme on....");
        });
        this.render();
    },
    events: {
        'click #home': 'changeColor',
        'click #work': 'clickIt'
    },
    methods: {
        changeColor: function(e) {
            console.log('changeColor.....');
            GMP.GMPEvents.trigger("GMPEvents_showme");
        },
        clickIt: function(e) {
            console.log('clickIt.....', e, $(e.target).attr('id'));
            GMP.GMPEvents.off("GMPEvents_showme");
            this.data.name = 'zhangzhao';
            this.data.data = {
                title: '标签',
                list: ['BBB', 'AAA']
            };
            this.render();
        }
    },
    render: function() {
        var html = this.template.listTemplate(this.data.data);
        document.getElementById('home').innerHTML = html;

        var button = this.template.buttonTemplate();
        document.getElementById('buttonDiv').innerHTML = button;
    }
});

console.log(g.state.userId);
