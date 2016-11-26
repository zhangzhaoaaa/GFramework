(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.GMP = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits$1 = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * Created by zhangmike on 16/10/17.
 */
var uid = 0;
// let viewOptions = ['data', 'el', 'events', 'methods', 'init', 'render'];
function initMixin(GMP) {
    /**
     * The main init sequence. This is called for every
     * instance, including ones that are created from extended
     * constructors.
     *
     * @param {Object} options - this options object should be
     *                           the result of merging class
     *                           options and the options passed
     *                           in to the constructor.
     */
    GMP._assignPros({
        _init: function _init(options) {
            options = options || {};

            this._uid = 'g' + uid++;

            _extends(this, options);

            this.el = this.el || 'body';

            this._eventsMapList = {};

            // 初始化data
            this._initState();

            // 初始化事件
            this._initEvents();

            // 初始化Els
            this._initEls();

            this._callHook('init');

            // 扫描模板结构
        }
    });
}

/**
 * Created by zhangmike on 16/10/19.
 */
var ObjProto = Object.prototype;
function isType(type) {
    return function (obj) {
        return ObjProto.toString.call(obj) === '[object ' + type + ']';
    };
}

var utils = {
    isFunction: function isFunction(name) {
        return isType('Function')(name);
    },
    isObject: function isObject(name) {
        return isType('Object')(name);
    },
    has: function has(obj, key) {
        return obj != null && ObjProto.hasOwnProperty.call(obj, key);
    },
    create: function create(proto, props) {
        if (this.isObject(props)) {
            Object.keys(props).forEach(function (key) {
                proto[key] = props[key];
            });
        }
        return proto;
    },
    defaults: function defaults(to, from) {
        var fromAttrs = Object.keys(from);
        fromAttrs.forEach(function (current) {
            if (!to[current] || to[current] === void 0) {
                to[current] = from[current];
            }
        });
        return to;
    },
    mergeData: function mergeData(to, from) {
        var key = void 0,
            toVal = void 0,
            fromVal = void 0;
        for (key in from) {
            toVal = to[key];
            fromVal = from[key];
            if (!Object.hasOwnProperty(to, key)) {
                Object.defineProperty(to, key, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: fromVal
                });
            } else if (this.isObject(toVal) && this.isObject(fromVal)) {
                this.mergeData(toVal, fromVal);
            }
        }
    },
    equal: function equal(a, b, aStack, bStack) {
        if (a === b) {
            return a !== 0 || 1 / a === 1 / b;
        }
        if (a == null || b == null) {
            return a === b;
        }
        var toString = ObjProto.toString;
        var className = toString.call(a);
        if (className !== toString.call(b)) {
            return false;
        }
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') {
                return false;
            }
            var aCtor = a.constructor;
            var bCtor = b.constructor;
            if (aCtor !== bCtor && !(this.isFunction(aCtor) && aCtor instanceof aCtor && this.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a) {
                return bStack[length] === b;
            }
        }

        aStack.push(a);
        bStack.push(b);

        if (areArrays) {
            length = a.length;
            if (length !== b.length) {
                return false;
            }
            while (length--) {
                if (!this.equal(a[length], b[length], aStack, bStack)) {
                    return false;
                }
            }
        } else {
            var key;
            var keys = Object.keys(a);
            length = keys.length;
            if (Object.keys(b).length !== length) {
                return false;
            }
            while (length--) {
                key = keys[length];
                if (!(this.has(b, key) && this.equal(a[key], b[key], aStack, bStack))) {
                    return false;
                }
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }
};

/**
 * Created by zhangmike on 16/10/17.
 */
var delegateEventSplitter = /^(\S+)\s*(.*)$/;
function eventsMixin(GMP) {
    /**
     * Setup the instance's option events.
     * If the value is a string, we pull it from the
     * instance's methods by name.
     */
    GMP._assignPros({
        _initEvents: function _initEvents() {
            registerCallbacks(this, this.events);
        },
        undelegateEvents: function undelegateEvents() {
            if (this.$el) {
                this.$el.off('.delegateEvents' + this._uid);
            }
            return this;
        },
        delegateEvents: function delegateEvents(events) {
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

        undelegate: function undelegate(eventName, selector, listener) {
            this.$el.off(eventName + '.delegateEvents' + this._uid, selector, listener);
            return this;
        },
        delegate: function delegate(eventName, selector, listener) {
            this.$el.on(eventName + '.delegateEvents' + this._uid, selector, listener);
            return this;
        },
        _setElement: function _setElement(el) {
            this.$el = el instanceof GMP.$() ? el : GMP.$()(el);
            this.el = this.$el[0];
        },
        _callHook: function _callHook(hook) {
            var handlers = this[hook];
            if (hook && handlers) {
                handlers.call(this);
            }
        },
        on: function on(name, cb) {
            var evn = this._uid + name;
            if (this._eventsMapList[evn]) {
                this._eventsMapList[evn].push(cb);
            } else {
                this._eventsMapList[evn] = [cb];
            }
        },
        off: function off(name) {
            var evn = this._uid + name;
            if (this._eventsMapList[evn]) {
                this._eventsMapList[evn] = [];
            }
        },
        trigger: function trigger(name, args) {
            var _this = this;

            var evn = this._uid + name;
            var cbs = this._eventsMapList[evn];
            if (cbs) {
                cbs.forEach(function (fn) {
                    fn.apply(_this, [args]);
                });
            }
        },
        destroy: function destroy() {
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

/**
 * Created by zhangmike on 16/10/18.
 */
function initState(GMP) {
    /**
     * Setup the scope of an instance, which contains:
     * - observed data
     */
    GMP._assignPros({
        _initState: function _initState() {
            this._initData();
        },
        _initData: function _initData() {
            var _this = this;

            this._data = this.data || {};
            var keys = Object.keys(this._data);
            var that = this;

            var _loop = function _loop() {
                var key = keys[i];
                var val = _this._data[keys[i]];
                property = Object.getOwnPropertyDescriptor(_this._data, key);

                if (property && property.configurable === false) {
                    return 'continue';
                }
                Object.defineProperty(that._data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function reactiveGetter() {
                        return val;
                    },
                    set: function reactiveSetter(newVal) {
                        var value = val;
                        if (utils.equal(newVal, value)) {
                            return;
                        } else {
                            val = newVal;
                            that.trigger('change:' + key);
                        }
                    }
                });
            };

            for (var i = 0, l = keys.length; i < l; i++) {
                var property;

                var _ret = _loop();

                if (_ret === 'continue') continue;
            }
        },
        _initEls: function _initEls() {
            var _this2 = this;

            if (this.els) {
                Object.keys(this.els).forEach(function (current) {
                    _this2.els[current] = _this2.els[current] instanceof GMP.$() ? _this2.els[current] : GMP.$()(_this2.els[current]);
                });
            }
        }
    });
}

/**
 * Created by zhangmike on 16/10/18.
 */
function initEventBus(GMP) {
    var events = {};
    var registerEvent = function registerEvent(eName, handler, scope) {
        events[eName] = events[eName] || [];
        events[eName].push({
            scope: scope || this,
            handler: handler
        });
    };
    var removeEvent = function removeEvent(eName, callback, scope) {
        var fns = events[eName];
        scope = scope || this;
        if (!fns) {
            return;
        }
        events[eName] = events[eName].filter(function (fn) {
            if (callback && callback !== fn.callback || scope && scope !== fn.scope) {
                return true;
            } else {
                return false;
            }
        });
    };
    var triggerEvent = function triggerEvent(eventName) {
        var fns = events[eventName];
        var i, fn, len;
        if (!fns) {
            return;
        }

        for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
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

/**
 * Created by zhangmike on 16/10/18.
 */
var GMPX = function () {
    function GMPX(state) {
        classCallCheck(this, GMPX);

        this._init(state);
    }

    createClass(GMPX, [{
        key: "_init",
        value: function _init(state) {
            var _this = this;

            if (!state) {
                return Object.create(null);
            }
            var keys = Object.keys(state);
            this.state = state;
            var that = this;

            var _loop = function _loop() {
                var key = keys[i];
                var val = _this.state[keys[i]];
                property = Object.getOwnPropertyDescriptor(_this.state, key);

                if (property && property.configurable === false) {
                    return "continue";
                }
                Object.defineProperty(that.state, key, {
                    enumerable: true,
                    configurable: true,
                    get: function reactiveGetter() {
                        return val;
                    },
                    set: function reactiveSetter(newVal) {
                        var value = val;
                        if (newVal === value) {
                            return;
                        }
                        val = newVal;
                    }
                });
            };

            for (var i = 0, l = keys.length; i < l; i++) {
                var property;

                var _ret = _loop();

                if (_ret === "continue") continue;
            }
        }
    }]);
    return GMPX;
}();

/**
 * Created by zhangmike on 16/10/20.
 */
var extend = function (protoProps, staticProps) {
    var parent = this;
    var child;

    if (protoProps && utils.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function child() {
            return parent.apply(this, arguments);
        };
    }

    _extends(child, parent, staticProps);

    child.prototype = utils.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    child.__super__ = parent.prototype;

    return child;
};

/**
 * Created by zhangmike on 16/10/25.
 */
var _t = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
    '`': '&#x60;'
};

var createEscaper = function createEscaper(map) {
    var escaper = function escaper(match) {
        return map[match];
    };
    var source = '(?:' + Object.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function (string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
};
_t.escape = createEscaper(escapeMap);

var templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
};

var noMatch = /(.)^/;

var escapes = {
    '\'': '\'',
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};

var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function escapeChar(match) {
    return '\\' + escapes[match];
};
var htmlTag = /<[^>]+>/g;
var text = '';
function template(str) {
    if (htmlTag.test(str)) {
        text = str;
    } else {
        text = document.getElementById(str).innerHTML || '';
    }
    var matcher = RegExp([(templateSettings.escape || noMatch).source, (templateSettings.interpolate || noMatch).source, (templateSettings.evaluate || noMatch).source].join('|') + '|$', 'g');

    var index = 0;
    var source = '__p+=\'';
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escaper, escapeChar);
        index = offset + match.length;

        if (escape) {
            source += '\'+\n((__t=(' + escape + '))==null?\'\':_t.escape(__t))+\n\'';
        } else if (interpolate) {
            source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
        } else if (evaluate) {
            source += '\';\n' + evaluate + '\n__p+=\'';
        }

        return match;
    });
    source += '\';\n';

    source = 'with(obj||{}){\n' + source + '}\n';

    source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';

    try {
        var render = new Function('obj', source);
    } catch (e) {
        e.source = source;
        throw e;
    }

    var template = function template(data) {
        return render.call(this, data);
    };

    var argument = 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';
    return template;
}

/**
 * Created by zhangmike on 16/10/14.
 */
/* global $ */
/**
 * The exposed GMP constructor.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 * @example
 * new GMP({
 *  data: '123',
 *   login: function () {
 *
 *   }
 * })
 */

var GMP$3 = function () {
    function GMP(options) {
        classCallCheck(this, GMP);

        this._init(options);
    }

    createClass(GMP, null, [{
        key: '$',
        value: function (_$) {
            function $() {
                return _$.apply(this, arguments);
            }

            $.toString = function () {
                return _$.toString();
            };

            return $;
        }(function () {
            if (window.jQuery || window.$ || $) {
                return window.jQuery || window.$ || $;
            }
            throw new Error('GMP need jQuery or Zepto in window scope named $');
        })
    }, {
        key: '_assignPros',
        value: function _assignPros(pros) {
            _extends(GMP.prototype, pros);
        }
    }]);
    return GMP;
}();

// 初始化属性


initMixin(GMP$3);
// 初始化事件
eventsMixin(GMP$3);
// 初始化数据
initState(GMP$3);
// 初始化事件BUS
initEventBus(GMP$3);

GMP$3.GMPX = GMPX;
GMP$3.extend = extend;
GMP$3.template = template;

var html = "<button id=\"<%=id%>\" href=\"javascript:void 0;\"\n        tabindex=\"0\"\n        role=\"button\"\n        aria-disabled=\"false\"\n        aria-pressed=\"false\"><%=value%></button>";

/**
 * Created by zhangmike on 16/10/20.
 */
/* global $ */
var BaseClass = function (_GMP) {
    inherits$1(BaseClass, _GMP);

    function BaseClass(options) {
        classCallCheck(this, BaseClass);

        var init = !!options.init === true ? options.init : null;
        if (options.init) {
            delete options.init;
        }

        var _this = possibleConstructorReturn(this, (BaseClass.__proto__ || Object.getPrototypeOf(BaseClass)).call(this, options));

        init != null ? _this.on('_on_init', init) : '';
        _this.on('_on_after', _this._after);
        return _this;
    }

    createClass(BaseClass, [{
        key: '_after',
        value: function _after(options) {
            if (options) {
                this._create();
            } else {
                throw new Error('请正确填写属性!');
            }
            this.trigger('_on_init');
        }
    }, {
        key: '_create',
        value: function _create(html) {
            if (!this.data) {
                this.$el.html(GMP$3.template(html)());
            } else {
                this.$el.html(GMP$3.template(html)(this.data));
            }
        }
    }, {
        key: '_appendTo',
        value: function _appendTo(el) {
            var element = el;
            if (element && (element.jquery || element.nodeType)) {
                return $(element)[0];
            }
            return document.querySelector(element || 'body');
        }
    }, {
        key: 'set',
        value: function set(attrName, val) {
            var oldval = this.data[attrName];
            this.data[attrName] = val;
            var setCb = this['_on_' + attrName + 'Update'];
            if (utils.isFunction(setCb)) setCb.call(this, val, oldval);
        }
    }, {
        key: 'get',
        value: function get(attrName) {
            return this.data[attrName];
        }
    }], [{
        key: 'inherits',
        value: function inherits(protoProps, staticProps) {
            var parent = this;
            var child = void 0;

            if (protoProps && utils.has(protoProps, 'constructor')) {
                child = protoProps.constructor;
            } else {
                child = function child() {
                    return parent.apply(this, arguments);
                };
            }

            _extends(child, parent, staticProps);

            child.prototype = utils.create(parent.prototype, protoProps);
            child.prototype.constructor = child;

            child.__super__ = parent.prototype;

            return child;
        }
    }]);
    return BaseClass;
}(GMP$3);

/**
 * Created by zhangmike on 16/10/20.
 */
var Button = function (_BaseClass) {
    inherits$1(Button, _BaseClass);

    function Button(options) {
        classCallCheck(this, Button);

        var _this = possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, options));

        get$1(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), '_create', _this).call(_this, html);
        return _this;
    }

    createClass(Button, [{
        key: 'preinit',
        value: function preinit() {
            console.log('preinit....');
        }
    }, {
        key: 'enable',
        value: function enable() {
            this.$el.find('[role=button]').attr('aria-disabled', false).removeAttr('disabled');
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.$el.find('[role=button]').attr('aria-disabled', true).attr('disabled', true);
        }
    }]);
    return Button;
}(BaseClass);

var html$1 = "<div class=\"m-dialog\" role='alertdialog'>\n    <div class=\"dialog-tit\"><%=title%></div>\n    <div class=\"dialog-txt\"><%=msg%></div>\n    <div class=\"dialog-btn\">\n        <a href=\"javascript:;\" role='button' class=\"default okBtn\" aria-controls='ok'>确定</a>\n        <a href=\"javascript:;\" role='button' class=\"primary cancelBtn\" aria-controls='cancel'>取消</a>\n    </div>\n</div>";

/**
 * Created by zhangmike on 16/11/2.
 */
function preInit() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var d = {
        'click .okBtn': 'ok',
        'click .cancelBtn': 'cancel'
    };
    if (!options.events) {
        options.events = d;
    } else {
        utils.defaults(options.events, d);
    }
    if (!options.data) {
        options.data = config;
    } else {
        utils.defaults(options.data, config);
    }
}

/**
 * Created by zhangmike on 16/10/28.
 */
/* global $, GMP */
var Alert = function (_BaseClass) {
    inherits$1(Alert, _BaseClass);

    function Alert(options) {
        classCallCheck(this, Alert);

        preInit(options);

        var _this = possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, options));

        _this.trigger('_on_after', options);
        return _this;
    }

    createClass(Alert, [{
        key: '_create',
        value: function _create() {
            this._createWrapper();
            var alertHtml = GMP.template(html$1)(this.data);
            this.uiAlert.append(alertHtml);
        }
    }, {
        key: '_createWrapper',
        value: function _createWrapper() {
            this.uiAlert = $('<div>').hide().attr({
                tabIndex: -1,
                role: 'dialog'
            }).appendTo(this._appendTo(this.el));
        }
    }, {
        key: 'open',
        value: function open() {
            this.uiAlert.show();
        }
    }, {
        key: 'ok',
        value: function ok() {
            this.$el.hide();
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.$el.hide();
        }
    }]);
    return Alert;
}(BaseClass);

var html$2 = "<div class=\"m-dialog\" role='confirmdialog'>\n    <div class=\"dialog-tit\"><%=title%></div>\n    <div class='dialog-content dialog-txt'>\n        <%=msg%>\n    </div>\n    <div class=\"dialog-btn\">\n        <a href=\"javascript:;\" role='button' class=\"default okBtn\" aria-controls='ok'>确定</a>\n        <a href=\"javascript:;\" role='button' class=\"primary cancelBtn\" aria-controls='ok'>取消</a>\n    </div>\n</div>";

/**
 * Created by zhangmike on 16/10/29.
 */
/* global $, GMP */
var Confirm = function (_BaseClass) {
    inherits$1(Confirm, _BaseClass);

    function Confirm(options) {
        classCallCheck(this, Confirm);

        preInit(options);

        var _this = possibleConstructorReturn(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call(this, options));

        _this.trigger('_on_after', options);
        return _this;
    }

    createClass(Confirm, [{
        key: '_create',
        value: function _create() {
            this._createWrapper();
            var confirmHtml = GMP.template(html$2)(this.data);
            this.uiConfirm.append(confirmHtml);
        }
    }, {
        key: '_createWrapper',
        value: function _createWrapper() {
            this.uiConfirm = $('<div>').hide().attr({
                tabIndex: -1,
                role: 'dialog'
            }).appendTo(this._appendTo(this.el));
        }
    }, {
        key: 'open',
        value: function open() {
            this.uiConfirm.show();
        }
    }, {
        key: 'ok',
        value: function ok() {
            this.uiConfirm.hide();
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.uiConfirm.hide();
        }
    }]);
    return Confirm;
}(BaseClass);

/**
 * Created by zhangmike on 16/10/29.
 */
/* global $, GMP */
var config = {
    title: '标题'
};
var tmpl = {
    layer: '<div class="layer"></div>',
    header: '<h2 class="dialog-header"><%=title%></h2>',
    footer: '<div class="dialog-footer">' + '<a href="javascript: void 0;" role="button" class="okBtn" aria-controls="ok">确定</a>' + '<a href="javascript: void 0;" role="button" class="cancelBtn" aria-controls="cancel">取消</a>' + '</div>'
};
var htmlTag$1 = /<[^>]+>/g;

var Modal = function (_BaseClass) {
    inherits$1(Modal, _BaseClass);

    function Modal(options) {
        classCallCheck(this, Modal);

        preInit(options, config);

        var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, options));

        _this.trigger('_on_after', options);
        return _this;
    }

    createClass(Modal, [{
        key: '_create',
        value: function _create(options) {
            this._createWrapper();
            var header = void 0,
                content = void 0,
                footer = void 0,
                data = this.data;
            if (data.header) {
                if (htmlTag$1.test(data.header)) {
                    header = data.header;
                } else {
                    header = $(data.header).html();
                }
            } else {
                header = tmpl.header;
            }
            if (data.content) {
                if (htmlTag$1.test(data.content)) {
                    content = data.content;
                } else {
                    content = $(data.content).html();
                }
            } else {
                content = tmpl.content || '<p style="text-align: center">正文</p>';
            }
            if (data.footer) {
                if (htmlTag$1.test(data.footer)) {
                    footer = data.footer;
                } else {
                    footer = $(data.footer).html();
                }
            } else {
                footer = tmpl.footer;
            }
            var dialog = header + content + footer;
            $(dialog).show().removeAttr('title').appendTo(this.uiDialog);
            var dialogHtml = GMP.template(dialog)(this.data);
            this.uiDialog.html(dialogHtml);
        }
    }, {
        key: '_createWrapper',
        value: function _createWrapper() {
            this.uiDialog = $('<div>').addClass('dialog').hide().attr({
                tabIndex: -1,
                role: 'dialog'
            }).appendTo(this._appendTo(this.el));
        }
    }, {
        key: '_createOverLay',
        value: function _createOverLay() {
            this.overlay = $(tmpl.layer).appendTo(this._appendTo(this.el));
        }
    }, {
        key: '_destroyOverLay',
        value: function _destroyOverLay() {
            this.overlay.remove();
        }
    }, {
        key: 'ok',
        value: function ok() {
            this.close();
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.close();
        }
    }, {
        key: 'open',
        value: function open() {
            if (this.uiDialog) {
                this._createOverLay();
                this.uiDialog.show();
            }
        }
    }, {
        key: 'close',
        value: function close() {
            this._destroyOverLay();
            this.uiDialog.hide();
        }
    }, {
        key: 'destory',
        value: function destory() {
            this.uiDialog.remove();
        }
    }]);
    return Modal;
}(BaseClass);

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
        x = x.replace(/(\d+(?:\.\d+)?)%/gi, function (m, d) {
            return (isVIEWPORT ? $(window)['outer' + type]() : $(element)['outer' + type]()) * (d / 100.0);
        });
    }

    // 处理类似 100%+20px 的情况
    if (/[+\-*\/]/.test(x)) {
        try {
            // eval 会影响压缩
            // new Function 方法效率高于 for 循环拆字符串的方法
            // 参照：http://jsperf.com/eval-newfunction-for
            x = new Function('return ' + x)();
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
    pin: function pin(element, offset, base) {
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
    centerInWindow: function centerInWindow(element) {
        this.pin(element, {
            x: '50%-' + $(element).width() / 2,
            y: '50%-' + $(element).height() / 2
        });
    }
};

/**
 * @author fuqiang [designsor@gmail.com]
 * @date 20161031
 * @fileoverview 浮层统一类
 */
/* global $ */
var Overlay = function (_BaseClass) {
    inherits$1(Overlay, _BaseClass);

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
    function Overlay(options) {
        classCallCheck(this, Overlay);

        var _this = possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, options));

        _this.setup();
        _this._create(GMP$3.template('<div style="z-index:<%=zIndex%>;width:<%=width%>px;height:<%=height%>px;" class="<%=clsName%>"></div>')(options.data));
        return _this;
    }

    createClass(Overlay, [{
        key: '_create',
        value: function _create(html) {
            this.uiOverlay = $(html);
            $('body').append(this.uiOverlay);
            this.trigger('create');
        }
    }, {
        key: 'show',
        value: function show() {
            this.set('visible', true);
            this.trigger('show');
            return this;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.set('visible', false);
            this.trigger('hide');
            return this;
        }
    }, {
        key: 'setup',
        value: function setup() {
            var _this2 = this;

            // 不需要加shim，因为不兼容ie6
            this._setupResize();
            this.on('create', function () {
                console.log('create');
                var pos = _this2.uiOverlay.css('position');
                if (pos === 'static' || pos === 'relative') {
                    _this2.uiOverlay.css({
                        position: 'absolute',
                        left: '-9999px',
                        top: '-9999px'
                    });
                }
            });
            this.on('show', function () {
                console.log('show');
                _this2._setPosition();
            });
        }
    }, {
        key: '_setupResize',
        value: function _setupResize() {
            Overlay.allOverlays.push(this);
        }
    }, {
        key: '_setPosition',
        value: function _setPosition() {
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
    }, {
        key: '_blurHide',
        value: function _blurHide() {
            for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
                arr[_key] = arguments[_key];
            }

            arr.push(this.uiOverlay);
            this._relativeElements = arr;
            Overlay.blurOverlays.push(this);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this3 = this;

            Overlay.allOverlays = Overlay.allOverlays.filter(function (item) {
                return _this3 !== item;
            });
            Overlay.blurOverlays = Overlay.blurOverlays.filter(function (item) {
                return _this3 !== item;
            });
            if (get$1(Overlay.prototype.__proto__ || Object.getPrototypeOf(Overlay.prototype), 'destory', this)) get$1(Overlay.prototype.__proto__ || Object.getPrototypeOf(Overlay.prototype), 'destroy', this).call(this);
        }
        // 用于 set 属性后的界面更新

    }, {
        key: '_on_widthUpdate',
        value: function _on_widthUpdate(val) {
            this.uiOverlay.css('width', val);
        }
    }, {
        key: '_on_heightUpdate',
        value: function _on_heightUpdate(val) {
            this.uiOverlay.css('height', val);
        }
    }, {
        key: '_on_zIndexUpdate',
        value: function _on_zIndexUpdate(val) {
            this.uiOverlay.css('zIndex', val);
        }
    }, {
        key: '_on_visibleUpdate',
        value: function _on_visibleUpdate(val) {
            this.uiOverlay[val ? 'show' : 'hide']();
        }
    }]);
    return Overlay;
}(BaseClass);

Overlay.allOverlays = [];
Overlay.blurOverlays = [];

$(document).on('click', function (e) {
    hideBlurOverlays(e);
});

function isInDocument(element) {
    return $.contains(document.documentElement, element);
}

function hideBlurOverlays(e) {
    Overlay.blurOverlays.forEach(function (index, item) {
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

$(window).resize(function () {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(function () {
        var winNewWidth = $(window).width();
        var winNewHeight = $(window).height();

        // IE678 莫名其妙触发 resize
        // http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
        if (winWidth !== winNewWidth || winHeight !== winNewHeight) {
            $(Overlay.allOverlays).each(function (i, item) {
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

/**
 * Created by zhangmike on 16/10/20.
 */


var widgets = Object.freeze({
	Button: Button,
	Alert: Alert,
	Confirm: Confirm,
	Modal: Modal,
	Position: Position,
	Overlay: Overlay
});

/**
 * Created by zhangmike on 16/10/20.
 */
/* global $ */
GMP$3.Widgets = function () {};
GMP$3.Widgets['register'] = function (name, options) {
    if (this[name] != null) {
        throw new Error('已存在该名称的Widgets,请改名!');
    } else {
        this[name] = BaseClass.inherits(options);
    }
};

_extends(GMP$3.Widgets, widgets);

var uiInit = function uiInit() {
    $('body').addClass('opg');
};
// UI初始化
uiInit();

return GMP$3;

})));
//# sourceMappingURL=gmp.js.map
