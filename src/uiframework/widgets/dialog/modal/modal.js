/**
 * Created by zhangmike on 16/10/29.
 */
/* global $, GMP */
import BaseClass from '../../../base/Class';
import preInit from '../index';
const config = {
    title: '标题'
};
const tmpl = {
    layer: '<div class="layer"></div>',
    header: '<h2 class="dialog-header"><%=title%></h2>',
    footer: '<div class="dialog-footer">' +
    '<a href="javascript: void 0;" role="button" class="okBtn" aria-controls="ok">确定</a>' +
    '<a href="javascript: void 0;" role="button" class="cancelBtn" aria-controls="cancel">取消</a>' +
    '</div>'
};
const htmlTag = /<[^>]+>/g;

class Modal extends BaseClass {

    constructor(options) {
        preInit(options, config);
        super(options);
        this.trigger('_on_after', options);
    }
    _create(options) {
        this._createWrapper();
        let header,
            content,
            footer,
            data = this.data;
        if (data.header) {
            if (htmlTag.test(data.header)) {
                header = data.header;
            } else {
                header = $(data.header).html();
            }
        } else {
            header = tmpl.header;
        }
        if (data.content) {
            if (htmlTag.test(data.content)) {
                content = data.content;
            } else {
                content = $(data.content).html();
            }
        } else {
            content = tmpl.content || '<p style="text-align: center">正文</p>';
        }
        if (data.footer) {
            if (htmlTag.test(data.footer)) {
                footer = data.footer;
            } else {
                footer = $(data.footer).html();
            }
        } else {
            footer = tmpl.footer;
        }
        let dialog = header + content + footer;
        $(dialog).show()
            .removeAttr('title')
            .appendTo(this.uiDialog);
        let dialogHtml = GMP.template(dialog)(this.data);
        this.uiDialog.html(dialogHtml);
    }
    _createWrapper() {
        this.uiDialog = $('<div>').addClass('dialog')
            .hide()
            .attr({
                tabIndex: -1,
                role: 'dialog'
            })
            .appendTo(this._appendTo(this.el));
    }
    _createOverLay() {
        this.overlay = $(tmpl.layer)
            .appendTo(this._appendTo(this.el));
    }
    _destroyOverLay() {
        this.overlay.remove();
    }
    ok() {
        this.close();
    }
    cancel() {
        this.close();
    }
    open() {
        if (this.uiDialog) {
            this._createOverLay();
            this.uiDialog.show();
        }
    }
    close() {
        this._destroyOverLay();
        this.uiDialog.hide();
    }
    destory() {
        this.uiDialog.remove();
    }

};

export default Modal;
