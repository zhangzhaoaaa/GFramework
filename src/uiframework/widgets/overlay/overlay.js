/**
 * @author fuqiang [designsor@gmail.com]
 * @date 20161031
 * @fileoverview 浮层统一类
 */
/* global $ */
import GMP from '../../../jsframework/index';
import Position from '../position/position';
import BaseClass from '../../base/Class';

class Overlay extends BaseClass {
    /*
    constructor(options = {
        data:{
            width: null,
            height: null,
            zIndex: 999,
            visible: false,
            x: 0,
            y: 0,
            clsName:'',
        }
    }) {
    */
    constructor(options) {
        super(options);
        this.setup();
        this._create(GMP.template('<div style="z-index:<%=zIndex%>;width:<%=width%>px;height:<%=height%>px;" class="<%=clsName%>"></div>')(options.data));
    }
    _create(html) {
        this.uiOverlay = $(html);
        $('body').append(this.uiOverlay);
        this.trigger('create');
    }
    show() {
        this.set('visible', true);
        this.trigger('show');
        return this;
    }
    hide() {
        this.set('visible', false);
        this.trigger('hide');
        return this;
    }
    setup() {
        // 不需要加shim，因为不兼容ie6
        this._setupResize();
        this.on('create', () => {
            console.log('create');
            var pos = this.uiOverlay.css('position');
            if (pos === 'static' || pos === 'relative') {
                this.uiOverlay.css({
                    position: 'absolute',
                    left: '-9999px',
                    top: '-9999px'
                });
            }
        });
        this.on('show', () => {
            console.log('show');
            this._setPosition();
        });
    }
    _setupResize() {
        Overlay.allOverlays.push(this);
    }
    _setPosition() {
        // 不在文档流不需要对齐
        if (!isInDocument(this.uiOverlay[0])) return;
        var align = {
            x: this.data.x,
            y: this.data.y
        };
        // 都是0不需要对齐
        if (!align.x && !align.y) return;
        var isHidden = this.uiOverlay.css('display') === 'none';

        // 在定位时，为避免元素高度不定，先显示出来
        if (isHidden) {
            this.uiOverlay.css({
                visibility: 'hidden',
                display: 'block'
            });
        }
        Position.pin(this.uiOverlay, align, this.data.alignBase);
        // 定位完成后，还原
        if (isHidden) {
            this.uiOverlay.css({
                visibility: '',
                display: 'none'
            });
        }
        return this;
    }
    _blurHide(...arr) {
        arr.push(this.uiOverlay);
        this._relativeElements = arr;
        Overlay.blurOverlays.push(this);
    }
    destroy() {
        Overlay.allOverlays = Overlay.allOverlays.filter((item) => {
            return this !== item;
        });
        Overlay.blurOverlays = Overlay.blurOverlays.filter((item) => {
            return this !== item;
        });
        if (super.destory) super.destroy.call(this);
    }
    // 用于 set 属性后的界面更新
    _on_widthUpdate(val) {
        this.uiOverlay.css('width', val);
    }
    _on_heightUpdate(val) {
        this.uiOverlay.css('height', val);
    }
    _on_zIndexUpdate(val) {
        this.uiOverlay.css('zIndex', val);
    }
    _on_visibleUpdate(val) {
        this.uiOverlay[val ? 'show' : 'hide']();
    }
}

Overlay.allOverlays = [];
Overlay.blurOverlays = [];

$(document).on('click', (e) => {
    hideBlurOverlays(e);
});

function isInDocument(element) {
    return $.contains(document.documentElement, element);
}

function hideBlurOverlays(e) {
    Overlay.blurOverlays.forEach((index, item) => {
        // 当实例为空或隐藏时，不处理
        if (!item || !item.get('visible')) {
            return;
        }
        // 遍历 _relativeElements ，当点击的元素落在这些元素上时，不处理
        for (var i = 0; i < item._relativeElements.length; i++) {
            var el = $(item._relativeElements[i])[0];
            if (el === e.target || $.contains(el, e.target)) {
                return;
            }
        }
        // 到这里，判断触发了元素的 blur 事件，隐藏元素
        item.hide();
    });
}

var timeout;
var winWidth = $(window).width();
var winHeight = $(window).height();

$(window).resize(function() {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(function() {
        var winNewWidth = $(window).width();
        var winNewHeight = $(window).height();

        // IE678 莫名其妙触发 resize
        // http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
        if (winWidth !== winNewWidth || winHeight !== winNewHeight) {
            $(Overlay.allOverlays).each(function(i, item) {
                // 当实例为空或隐藏时，不处理
                if (!item || !item.get('visible')) {
                    return;
                }
                item._setPosition();
            });
        }

        winWidth = winNewWidth;
        winHeight = winNewHeight;
    }, 80);
});

export default Overlay;
