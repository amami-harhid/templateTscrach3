/**
 * no-restricted-syntax
 * (1) while構文の最後の行はyieldでなければならない
 * (2) do...while構文の最後の行はyieldでなければならない
 * (3) for構文の最後の行はyieldでなければならない
 * (4) for...of, for...inは任意とするのでエラーにはしない。
 * (5) Array#forEachは yieldが使えないのでエラーにはしない。
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/*.d.ts"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: { globals: globals.browser },
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
          'argsIgnorePattern': ["^_$"] , // 引数
          "varsIgnorePattern": "^_$",  // 変数
          "caughtErrorsIgnorePattern": "^_$",  // errorハンドリング
          "destructuredArrayIgnorePattern": "^_$"  // 配列内の変数参照
        }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];