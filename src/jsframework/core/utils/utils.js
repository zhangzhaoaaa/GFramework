/**
 * Created by zhangmike on 16/10/19.
 */
let ObjProto = Object.prototype;
function isType(type) {
    return function(obj) {
        return ObjProto.toString.call(obj) === '[object ' + type + ']';
    };
}

export default {
    isFunction(name) {
        return isType('Function')(name);
    },
    isObject(name) {
        return isType('Object')(name);
    },
    has(obj, key) {
        return obj != null && ObjProto.hasOwnProperty.call(obj, key);
    },
    create(proto, props) {
        if (this.isObject(props)) {
            Object.keys(props).forEach(key => {
                proto[key] = props[key];
            });
        }
        return proto;
    },
    defaults(to, from) {
        let fromAttrs = Object.keys(from);
        fromAttrs.forEach(current => {
            if (!to[current] || to[current] === void 0) {
                to[current] = from[current];
            }
        });
        return to;
    },
    mergeData(to, from) {
        let key, toVal, fromVal;
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
    equal(a, b, aStack, bStack) {
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
            if (typeof a != 'object' || typeof b != 'object') {
                return false;
            }
            var aCtor = a.constructor;
            var bCtor = b.constructor;
            if (aCtor !== bCtor && !(this.isFunction(aCtor) && aCtor instanceof aCtor &&
                this.isFunction(bCtor) && bCtor instanceof bCtor) &&
                ('constructor' in a && 'constructor' in b)) {
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
