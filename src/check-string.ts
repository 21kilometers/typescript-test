import { createInterface } from 'readline';

/**
 * 問1の関数です。
 * @param {string} input 検証対象文字列
 * @returns {string} 検証結果
 */
const checkString = (input: string): string => {
  const numCheckRegexp = /^.[0-9０-９]{3}.*$/;
  if (numCheckRegexp.test(input)) {
    return input;
  } else {
    return '2文字目から4文字目が数字ではありません';
  }
};

const readlineInterface = createInterface({
  input: process.stdin,
  output: process.stdout
});

readlineInterface.question('Please input a string to check...\n>', (answer: string) => {
  console.log('check result:');
  console.log(checkString(answer));
  readlineInterface.close();
});
