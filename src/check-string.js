"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = require("readline");
/**
 * 問1の関数です。
 * @param {string} input 検証対象文字列
 * @returns {string} 検証結果
 */
var checkString = function (input) {
    var numCheckRegexp = /^.[0-9０-９]{3}.*$/;
    if (numCheckRegexp.test(input)) {
        return input;
    }
    else {
        return '2文字目から4文字目が数字ではありません';
    }
};
var readlineInterface = readline_1.createInterface({
    input: process.stdin,
    output: process.stdout
});
readlineInterface.question('Please input a string to check...\n>', function (answer) {
    console.log('check result:');
    console.log(checkString(answer));
    readlineInterface.close();
});
