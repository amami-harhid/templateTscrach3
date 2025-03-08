'use strict'
/**
 * no-restricted-syntax
 * (1) while構文の最後の行はyieldでなければならない
 * (2) do...while構文の最後の行はyieldでなければならない --> 2025/3/8 現在、チェックできていない
 * (3) for構文の最後の行はyieldでなければならない
 * (4) for...of, for...inは任意とするのでエラーにはしない。
 * (5) Array#forEachは yieldが使えないのでエラーにはしない。
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

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
      // "no-constant-condition": [
      //   "error", 
      //   {
      //     "checkLoops" :  "all",
      //   }
      // ],

    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];