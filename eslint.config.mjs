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
 * (1) 【Error】xxx.Sound.～ の awaitを必要とするメソッドに awaitを強制する
 * (2) 【Error】xxx.Event.～ の awaitを必要とするメソッドに awaitを強制する
 * (3) 【Error】xxx.Extensions.～ の awaitを必要とするメソッドに awaitを強制する
 * (4) 【Error】xxx.Looks.～ の awaitを必要とするメソッドに awaitを強制する
 * (5) 【Error】xxx.Control.～ の awaitを必要とするメソッドに awaitを強制する
 * (6) 【Error】HatEventメソッドの引数とするFunctionには asyncをつける
 * 
 * 【不思議なこと】
 * do{...}while(true)の形、条件式に固定でtrueを書いた直後はエラーになる。
 * yieldをいれるとtrueの部分がエラーにならない。
 * 結果オーライだが原因というか仕組みが分からないので気持ち悪いところがある。
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import {awaitControlRulesPlugin} from "./elintPlugin/eslintAwaitControlRulePlugin.js";
import {awaitSoundRulesPlugin} from "./elintPlugin/eslintAwaitSoundRulePlugin.js";
import {awaitEventRulesPlugin } from "./elintPlugin/eslintAwaitEventRulePlugin.js";
import {awaitExtensionsRulesPlugin} from "./elintPlugin/eslintAwaitExtensionsRulePlugin.js";
import {awaitLooksRulesPlugin} from "./elintPlugin/eslintAwaitLooksRulePlugin.js";
import {awaitLibRulesPlugin} from "./elintPlugin/eslintAwaitLibRulePlugin.js";
import {eventAsyncRulesPlugin} from "./elintPlugin/eslintEventAsyncRulePlugin.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/*.d.ts"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: { globals: globals.browser },
    plugins: {
      eventAsync: eventAsyncRulesPlugin,
      awaitControl : awaitControlRulesPlugin,
      awaitEvent : awaitEventRulesPlugin,
      awaitExtensions: awaitExtensionsRulesPlugin,
      awaitLooks : awaitLooksRulesPlugin,
      awaitLib : awaitLibRulesPlugin,
      awaitSound : awaitSoundRulesPlugin,
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
      'awaitControl/await-control-plugin': 'error',
      'awaitEvent/await-event-plugin': 'error',
      'awaitExtensions/await-extensions-plugin': 'error',
      'awaitLib/await-lib-plugin': 'error',
      'awaitLooks/await-looks-plugin': 'error',
      'awaitSound/await-sound-plugin': 'error',
      'eventAsync/event-async-plugin': 'error',
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];