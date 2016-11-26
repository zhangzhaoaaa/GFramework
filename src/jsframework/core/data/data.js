/**
 * Created by zhangmike on 16/10/18.
 */
export default class GMPX {
    constructor (state) {
        this._init(state);
    }
    _init (state) {
        if (!state) {
            return Object.create(null);
        }
        var keys = Object.keys(state);
        this.state = state;
        var that = this;
        for (var i = 0, l = keys.length; i < l; i++) {
            let key = keys[i];
            let val = this.state[keys[i]];
            var property = Object.getOwnPropertyDescriptor(this.state, key);
            if (property && property.configurable === false) {
                continue;
            }
            Object.defineProperty(that.state, key, {
                enumerable: true,
                configurable: true,
                get: function reactiveGetter () {
                    return val;
                },
                set: function reactiveSetter (newVal) {
                    var value = val;
                    if (newVal === value) {
                        return;
                    }
                    val = newVal;
                }
            });
        }
    }
}
