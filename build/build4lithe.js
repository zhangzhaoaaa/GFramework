/**
 * Created by zhangmike on 16/10/24.
 */
var fs = require('fs');
var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');
var path = require('path');
var code = fs.readFileSync(path.join(__dirname, '../dist/gmp.js')).toString();
var ast = esprima.parse(code);

ast = estraverse.replace(ast, {
    enter: function(node) {},
    leave: function(node) {
        // restore strings
        if (node.type === "BlockStatement" &&
            node.body && node.body.length > 0 &&
            node.body[0].expression &&
            node.body[0].expression.consequent &&
            node.body[0].expression.consequent.right &&
            node.body[0].expression.consequent.right.callee &&
            node.body[0].expression.consequent.right.callee.name === "factory"
        ) {

            var astObj = {
                "type": "IfStatement",
                "test": {
                    "type": "BinaryExpression",
                    "operator": "===",
                    "left": {
                        "type": "UnaryExpression",
                        "operator": "typeof",
                        "argument": {
                            "type": "Identifier",
                            "name": "define"
                        },
                        "prefix": true
                    },
                    "right": {
                        "type": "Literal",
                        "value": "function",
                        "raw": "'function'"
                    }
                },
                "consequent": {
                "type": "BlockStatement",
                    "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "define"
                            },
                            "arguments": [
                                {
                                    "type": "Literal",
                                    "value": "vendors/gmp.js",
                                    "raw": "'vendors/gmp.js'"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "factory"
                                }
                            ]
                        }
                    }
                ]
            },
            "alternate": null
            };
            node.body.push(astObj);
            return node;
        }
    }
});
var code =escodegen.generate(ast);

fs.writeFileSync(path.join(__dirname, '../dist/gmp.js'),code);