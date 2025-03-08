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
import {awaitSetOptonRulesPlugin} from "./elintPlugin/eslintAwaitSetOptoinRulePlugin.js";
import {eventAsyncRulesPlugin} from "./elintPlugin/eslintEventAsyncRulePlugin.js"

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
      eventAsync: eventAsyncRulesPlugin,
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