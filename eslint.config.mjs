'use strict'
/**
 * 【no-restricted-syntax】 
 * (1) while構文の最後の行はyieldでなければならない
 * (2) do...while構文の最後の行はyieldでなければならない
 * (3) for構文の最後の行はyieldでなければならない
 * (4) for...of, for...inは任意とするのでエラーにはしない（対象外）
 * (5) Array#forEachは yieldが使えないのでエラーにはしない（対象外）
 * 
 * 【plugin】
 * (1) 【warning】xxx.Sound.setOption(), xxx.Sound.playUntilDone() に awaitをつける
 * (2) 【Error】HatEventメソッドの引数とするFunctionには asyncをつける
 * ※ plugin定義の外だしをしたい(importをして利用)が、うまくいかないので(1)(2)をだらだらと書いている
 * pluginはもっと増やしたいのでそのうち何とかしないといけない。
 * 
 * 【不思議なこと】
 * do{...}while(true)の形、条件式に固定でtrueを書いた直後はエラーになる。
 * yieldをいれるとtrueの部分がエラーにならない。
 * 結果オーライだが原因というか仕組みが分からないので気持ち悪いところがある。
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
const awaitSetOptoinRule = {
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: [],
    messages: {
      AwaitSetOptionId: 'await をつけてください',
    },
  },
  create(context){
    return {
      Identifier(node) {
        if(node.type == 'Identifier' &&
          (node.name == 'setOption' ||
           node.name == 'playUntilDone')
        ) {
          if(node.parent.type == 'MemberExpression') {  
            const parent = node.parent;
            if(parent.object && parent.object.property 
                  && parent.object.property.name == 'Sound') {
              // (xxx.Sound.setOption) --> parent_parent 
              const parent_parent = node.parent.parent;
              if(parent_parent.type == 'CallExpression'){
              // (await xxx.Sound.setOption) --> parent_parent_parent 
              const parent_parent_parent = parent_parent.parent;
                if(parent_parent_parent.type!='AwaitExpression'){
                  // AwaitExpression でない場合( await がついていない場合)
                  context.report({
                    node,
                    messageId: "AwaitSetOptionId",
                    fix(fixer) {
                       return fixer.insertTextBefore(parent_parent, "await ");
                    }
                  })
                }
              }
            }
          }
        }
      }
    }
  },
}
const eventAsyncRule = {
  meta: {
      type: 'problem',
      fixable: 'code',
      schema: [],
      messages: {
        EventFunctionId: 'async をつけてください',
      },
    },
    create(context){
      return {
        ExpressionStatement(node){
          if( node.expression && node.expression.callee && node.expression.callee.object){
            const calee = node.expression.callee;
            const caleeObj = calee.object;
            if(caleeObj){
              const caleeObjProperty = caleeObj.property;
              if(caleeObjProperty && caleeObjProperty.name == 'Event'){
                const calleeProperty = calee.property;
                if(calleeProperty && calleeProperty.name == 'whenFlag'){
                  const _arguments = node.expression.arguments;
                  if(_arguments && Array.isArray(_arguments) && _arguments.length>0){
                    const functionExpression = _arguments[0];
                    if(functionExpression.type == 'FunctionExpression' 
                          && functionExpression.async == false){
                      // Eventへ渡すファンクションがasyncでないとき
                      context.report({
                        node,
                        messageId: "EventFunctionId",
                        data: {
                          notAsync: functionExpression.async,
                        },
                        fix(fixer) {
                           return fixer.insertTextBefore(functionExpression, "async ");
                        }
                      })
                    }     
                  }
                }
              }
            }
          }
        },
      }
    },
}
const awaitSetOptonRulesPlugin = { 
  meta:{
    name: 'await-setOption-plugin',
    version: '0.0.1',
  },
  rules: { "await-setOption-plugin": awaitSetOptoinRule },
};

const evnetAsyncRulesPlugin = { 
  meta:{
    name: 'event-async-plugin',
    version: '0.0.1',
  },
  rules: { "event-async-plugin": eventAsyncRule },
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/*.d.ts"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: { globals: globals.browser },
    plugins: {
      setOption : awaitSetOptonRulesPlugin,
      eventAsync: evnetAsyncRulesPlugin,
    },
    rules: {
      "no-this-alias": ["off"],
      "@typescript-eslint/no-this-alias": [
        "error",
        {
          "allowDestructuring": false, // Disallow 'const {props,state} = this';
          "allowedNames": ["self","me","clone"] // Allow 'const self = this;'
        }
      ],
      "no-restricted-syntax": [
        "error",
        {
          "selector": "WhileStatement > BlockStatement >:last-child[expression.type!='YieldExpression']",
          "message": "(ScratchLib)while構文の最後はyieldを書いてください"
        },
        {
          "selector": "DoWhileStatement > BlockStatement >:last-child[expression.type!='YieldExpression']",
          "message": "(ScratchLib)do...while構文の最後はyieldを書いてください"
        },
        {
          "selector": "ForStatement > BlockStatement >:last-child[expression.type!='YieldExpression']",
          "message": "(ScratchLib)for構文の最後はyieldを書いてください"
        }
      ],
      'no-unused-vars': [
        'error', 
        { 
          'argsIgnorePattern': "^_$" , // 引数
          "varsIgnorePattern": "^_$",  // 変数
          "caughtErrorsIgnorePattern": "^_$",  // errorハンドリング
          "destructuredArrayIgnorePattern": "^_$"  // 配列内の変数参照
        }
      ],
      'eventAsync/event-async-plugin': 'error',
      'setOption/await-setOption-plugin': 'warn'

    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];