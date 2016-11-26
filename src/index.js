/**
 * Created by zhangmike on 16/10/20.
 */
/* global $ */
import GMP from './jsframework/index';
import * as widgets from './uiframework/index';
import BaseClass from './uiframework/base/Class';

GMP.Widgets = function () {

};
GMP.Widgets['register'] = function (name, options) {
    if (this[name] != null) {
        throw new Error('已存在该名称的Widgets,请改名!');
    } else {
        this[name] = BaseClass.inherits(options);
    }
};

Object.assign(GMP.Widgets, widgets);

let uiInit = function() {
    $('body').addClass('opg');
};
// UI初始化
uiInit();

export default GMP;
