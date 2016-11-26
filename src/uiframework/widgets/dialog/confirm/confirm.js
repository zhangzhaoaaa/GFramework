/**
 * Created by zhangmike on 16/10/29.
 */
/* global $, GMP */
import html from './confirm.html';
import BaseClass from '../../../base/Class';
import preInit from '../index';

class Confirm extends BaseClass {
    constructor(options) {
        preInit(options);
        super(options);
        this.trigger('_on_after', options);
    }
    _create() {
        this._createWrapper();
        let confirmHtml = GMP.template(html)(this.data);
        this.uiConfirm.append(confirmHtml);
    }
    _createWrapper() {
        this.uiConfirm = $('<div>').hide()
            .attr({
                tabIndex: -1,
                role: 'dialog'
            })
            .appendTo(this._appendTo(this.el));
    }
    open() {
        this.uiConfirm.show();
    }
    ok() {
        this.uiConfirm.hide();
    }
    cancel() {
        this.uiConfirm.hide();
    }
};

export default Confirm;
