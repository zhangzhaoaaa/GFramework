/**
 * Created by zhangmike on 16/10/20.
 */
import html from './button.html';
import BaseClass from '../../base/Class';
class Button extends BaseClass {
    constructor(options) {
        super(options);
        super._create(html);
    }
    preinit() {
        console.log('preinit....');
    }
    enable() {
        this.$el.find('[role=button]').attr('aria-disabled', false).removeAttr('disabled');
    }
    disable() {
        this.$el.find('[role=button]').attr('aria-disabled', true).attr('disabled', true);
    }
};

export default Button;
