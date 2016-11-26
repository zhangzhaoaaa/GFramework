/**
 * Created by zhangmike on 16/10/14.
 */
/* global $ */
import initMixin from './internal/init';
import initEvents from './internal/events';
import initState from './internal/state';
import initEventBus from './events/eventbus';
import gmpx from './data/data';
import extend from './inherits/extend';
import template from './template/template';
/**
 * The exposed GMP constructor.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 * @example
 * new GMP({
 *  data: '123',
 *   login: function () {
 *
 *   }
 * })
 */
class GMP {
    constructor(options) {
        this._init(options);
    }
    static $() {
        if (window.jQuery || window.$ || $) {
            return window.jQuery || window.$ || $;
        }
        throw new Error('GMP need jQuery or Zepto in window scope named $');
    }
    static _assignPros(pros) {
        Object.assign(GMP.prototype, pros);
    }
}

// 初始化属性
initMixin(GMP);
// 初始化事件
initEvents(GMP);
// 初始化数据
initState(GMP);
// 初始化事件BUS
initEventBus(GMP);

GMP.GMPX = gmpx;
GMP.extend = extend;
GMP.template = template;
export default GMP;
