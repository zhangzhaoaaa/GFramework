/**
 * @author fuqiang[designsor@gmail.com]
 * @date 20161031
 * @fileoverview postion base
 */
/* global $ */
function convertXYtoNum(x, element, type, isVIEWPORT) {
    // 先转成字符串再说！好处理
    x = x + '';

    // 处理 px
    x = x.replace(/px/gi, '');

    // 将百分比转为像素值
    if (x.indexOf('%') !== -1) {
        // 支持小数
        x = x.replace(/(\d+(?:\.\d+)?)%/gi, function(m, d) {
            return (isVIEWPORT ? $(window)['outer' + type]() : $(element)['outer' + type]()) * (d / 100.0);
        });
    }

    // 处理类似 100%+20px 的情况
    if (/[+\-*\/]/.test(x)) {
        try {
            // eval 会影响压缩
            // new Function 方法效率高于 for 循环拆字符串的方法
            // 参照：http://jsperf.com/eval-newfunction-for
            x = (new Function('return ' + x))();
        } catch (e) {
            throw new Error('Invalid position value: ' + x);
        }
    }

    // 转回为数字
    return numberize(x);
}

function numberize(s) {
    return parseFloat(s, 10) || 0;
}

var Position = {
    pin(element, offset, base) {
        var isVIEWPORT = !base;
        element = $(element);
        base = base ? $(base) : $(window);
        element.css('position', 'absolute');
        offset = {
            x: convertXYtoNum(offset.x, element, 'Width', isVIEWPORT),
            y: convertXYtoNum(offset.y, element, 'Height', isVIEWPORT)
        };
        // 相对于可是窗口对齐（默认）
        if (isVIEWPORT) {
            element.offset({
                left: offset.x,
                top: offset.y
            });
        } else {
            element.offset({
                left: base.offset().left + offset.x,
                top: base.offset().top + offset.y
            });
        }
    },
    centerInWindow(element) {
        this.pin(element, {
            x: '50%-' + ($(element).width() / 2),
            y: '50%-' + ($(element).height() / 2)
        });
    }
};

export default Position;
