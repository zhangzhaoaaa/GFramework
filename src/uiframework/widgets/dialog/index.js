/**
 * Created by zhangmike on 16/11/2.
 */
import utils from '../../../jsframework/core/utils/utils';
export default function preInit(options = {}, config = {}) {
    let d = {
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