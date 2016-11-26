/**
 * Created by zhangmike on 16/10/17.
 */
import utils from '../utils/utils';

let delegateEventSplitter = /^(\S+)\s*(.*)$/;
export default function eventsMixin(GMP) {
    /**
     * Setup the instance's option events.
     * If the value is a string, we pull it from the
     * instance's methods by name.
     */
    GMP._assignPros({
        _initEvents() {
            registerCallbacks(this, this.events);
        },
        undelegateEvents() {
            if (this.$el) {
                this.$el.off('.delegateEvents' + this._uid);
            }
            return this;
        },
        delegateEvents(events) {
            events || (events = this.events);
            if (!events) {
                return this;
            }
            this.undelegateEvents();
            for (var key in events) {
                if (events.hasOwnProperty(key)) {
                    var method = events[key];
                    if (!utils.isFunction(method)) {
                        method = this[method];
                    }
                    if (!method) {
                        continue;
                    }
                    var match = key.match(delegateEventSplitter);
                    this.delegate(match[1], match[2], method.bind(this));
                }
            }
            return this;
        },
        undelegate: function(eventName, selector, listener) {
            this.$el.off(eventName + '.delegateEvents' + this._uid, selector, listener);
            return this;
        },
        delegate(eventName, selector, listener) {
            this.$el.on(eventName + '.delegateEvents' + this._uid, selector, listener);
            return this;
        },
        _setElement(el) {
            this.$el = el instanceof GMP.$() ? el : GMP.$()(el);
            this.el = this.$el[0];
        },
        _callHook(hook) {
            var handlers = this[hook];
            if (hook && handlers) {
                handlers.call(this);
            }
        },
        on(name, cb) {
            let evn = this._uid + name;
            if (this._eventsMapList[evn]) {
                this._eventsMapList[evn].push(cb);
            } else {
                this._eventsMapList[evn] = [cb];
            }
        },
        off(name) {
            let evn = this._uid + name;
            if (this._eventsMapList[evn]) {
                this._eventsMapList[evn] = [];
            }
        },
        trigger(name, args) {
            let evn = this._uid + name;
            var cbs = this._eventsMapList[evn];
            if (cbs) {
                cbs.forEach((fn) => {
                    fn.apply(this, [args]);
                });
            }
        },
        destroy() {
            this.undelegateEvents();
            this.$el.empty();
        }
    });
}

function registerCallbacks(vm, events) {
    vm.undelegateEvents();
    vm._setElement(vm.el);
    vm.delegateEvents(events);
    return vm;
}
