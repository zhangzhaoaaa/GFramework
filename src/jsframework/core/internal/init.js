/**
 * Created by zhangmike on 16/10/17.
 */
let uid = 0;
// let viewOptions = ['data', 'el', 'events', 'methods', 'init', 'render'];
export default function initMixin(GMP) {
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
        _init(options) {
            options = options || {};

            this._uid = 'g' + (uid++);

            Object.assign(this, options);

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
