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

var createEscaper = function(map) {
    var escaper = function(match) {
        return map[match];
    };
    var source = '(?:' + Object.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
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

var escapeChar = function(match) {
    return '\\' + escapes[match];
};
var htmlTag = /<[^>]+>/g;
var text = '';
export default function template(str) {
    if (htmlTag.test(str)) {
        text = str;
    } else {
        text = document.getElementById(str).innerHTML || '';
    }
    var matcher = RegExp([
        (templateSettings.escape || noMatch).source,
        (templateSettings.interpolate || noMatch).source,
        (templateSettings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    var index = 0;
    var source = '__p+=\'';
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
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

    source = 'var __t,__p=\'\',__j=Array.prototype.join,' +
        'print=function(){__p+=__j.call(arguments,\'\');};\n' +
        source + 'return __p;\n';

    try {
        var render = new Function('obj', source);
    } catch (e) {
        e.source = source;
        throw e;
    }

    var template = function(data) {
        return render.call(this, data);
    };

    var argument = 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';
    return template;
}