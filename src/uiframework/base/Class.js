/**
 * Created by zhangmike on 16/10/20.
 */
/* global $ */
import GMP from '../../jsframework/index';
import utils from '../../jsframework/core/utils/utils';

class BaseClass extends GMP {
    constructor(options) {
        let init = !!options.init === true ? options.init : null;
        if (options.init) {
            delete options.init;
        }
        super(options);
        init != null ? this.on('_on_init', init) : '';
        this.on('_on_after', this._after);
    }
    _after(options) {
        if (options) {
            this._create();
        } else {
            throw new Error('请正确填写属性!');
        }
        this.trigger('_on_init');
    }
    _create(html) {
        if (!this.data) {
            this.$el.html(GMP.template(html)());
        } else {
            this.$el.html(GMP.template(html)(this.data));
        }
    }
    _appendTo(el) {
        let element = el;
        if (element && (element.jquery || element.nodeType)) {
            return $(element)[0];
        }
        return document.querySelector(element || 'body');
    }
    set(attrName, val) {
        var oldval = this.data[attrName];
        this.data[attrName] = val;
        var setCb = this['_on_' + attrName + 'Update'];
        if (utils.isFunction(setCb)) setCb.call(this, val, oldval);
    }
    get(attrName) {
        return this.data[attrName];
    }
    static inherits(protoProps, staticProps) {
        let parent = this;
        let child;

        if (protoProps && utils.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function() {
                return parent.apply(this, arguments);
            };
        }

        Object.assign(child, parent, staticProps);

        child.prototype = utils.create(parent.prototype, protoProps);
        child.prototype.constructor = child;

        child.__super__ = parent.prototype;

        return child;
    }
}

export default BaseClass;
