/**
 * Created by zhangmike on 16/10/20.
 */
import utils from '../utils/utils';

export default function(protoProps, staticProps) {
    var parent = this;
    var child;

    if (protoProps && utils.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function() { return parent.apply(this, arguments); };
    }

    Object.assign(child, parent, staticProps);

    child.prototype = utils.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    child.__super__ = parent.prototype;

    return child;
}
