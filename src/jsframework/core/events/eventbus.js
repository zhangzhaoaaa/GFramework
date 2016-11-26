/**
 * Created by zhangmike on 16/10/18.
 */
export default function initEventBus (GMP) {
    let events = {};
    let registerEvent = function (eName, handler, scope) {
        events[eName] = events[eName] || [];
        events[eName].push({
            scope: scope || this,
            handler: handler
        });
    };
    let removeEvent = function (eName, callback, scope) {
        var fns = events[eName];
        scope = scope || this;
        if (!fns) {
            return;
        }
        events[eName] = events[eName].filter(function (fn) {
            if (callback && callback !== fn.callback ||
                scope && scope !== fn.scope
            ) {
                return true;
            } else {
                return false;
            }
        });
    };
    let triggerEvent = function (eventName, ...params) {
        var fns = events[eventName];
        var i, fn, len;
        if (!fns) {
            return;
        }
        for (i = 0, len = fns.length; i < len; i++) {
            fn = fns[i];
            fn.handler.apply(fn.scope, params || []);
        }
    };
    GMP.GMPEvents = {
        on: registerEvent,
        off: removeEvent,
        trigger: triggerEvent,
        _events: events
    };
}
