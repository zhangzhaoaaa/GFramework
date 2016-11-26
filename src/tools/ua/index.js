/**
 * @author fuqiang[designsor@gmail.com]
 * @date 20161031
 * @fileoverview user agent
 */

// Thanks http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
var ie = {
    version: () => {
        var v = 3;
        var div = document.createElement('div');
        var all = div.getElementsByTagName('i');
        while ((div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]));
        return v > 4 ? v : 0;
    }
};

export {
    ie
};
