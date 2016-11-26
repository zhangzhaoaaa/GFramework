/**
 * Created by zhangmike on 16/10/18.
 */
import util from '../utils/utils';
export default function initState(GMP) {
    /**
     * Setup the scope of an instance, which contains:
     * - observed data
     */
    GMP._assignPros({
        _initState() {
            this._initData();
        },
        _initData() {
            this._data = this.data || {};
            var keys = Object.keys(this._data);
            var that = this;
            for (var i = 0, l = keys.length; i < l; i++) {
                let key = keys[i];
                let val = this._data[keys[i]];
                var property = Object.getOwnPropertyDescriptor(this._data, key);
                if (property && property.configurable === false) {
                    continue;
                }
                Object.defineProperty(that._data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function reactiveGetter() {
                        return val;
                    },
                    set: function reactiveSetter(newVal) {
                        var value = val;
                        if (util.equal(newVal, value)) {
                            return;
                        } else {
                            val = newVal;
                            that.trigger('change:' + key);
                        }
                    }
                });
            }
        },
        _initEls() {
            if (this.els) {
                Object.keys(this.els).forEach(current => {
                    this.els[current] = this.els[current] instanceof GMP.$() ? this.els[current] : GMP.$()(this.els[current]);
                });
            }
        }
    });
}
