/**
 * Created by zhangmike on 16/10/21.
 */
var context = require.context('./unit', true, /\-spec\.js$/);
context.keys().forEach(context);
console.log(context.keys());