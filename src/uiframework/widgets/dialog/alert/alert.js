/**
 * Created by zhangmike on 16/10/28.
 */
/* global $, GMP */
import html from './alert.html';
import BaseClass from '../../../base/Class';
import preInit from '../index';

class Alert extends BaseClass {
    constructor(options) {
        preInit(options);
        super(options);
        this.trigger('_on_after', options);
    }
    _create() {
        this._createWrapper();
        let alertHtml = GMP.template(html)(this.data);
        this.uiAlert.append(alertHtml);
    }
    _createWrapper() {
        this.uiAlert = $('<div>').hide()
            .attr({
                tabIndex: -1,
                role: 'dialog'
            })
            .appendTo(this._appendTo(this.el));
    }
    open() {
        this.uiAlert.show();
    }
    ok() {
        this.$el.hide();
    }
    cancel() {
        this.$el.hide();
    }
};

export default Alert;
