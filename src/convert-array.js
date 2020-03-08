"use strict";
/**
 * 問2の関数です。
 * @param {Array<OldItem>} array 与えられた変換前の配列
 * @returns {Array<NewItem>} 変換後の配列
 */
var convertArray = function (array) {
    var returnArray = [];
    array.forEach(function (value) {
        if (value.children.length === 0) {
            // 子を持たない場合はstringに単純化
            returnArray.push(value.name);
        }
        else {
            var returnValue = {};
            // 子を持つ場合は子に対して再起呼び出し
            returnValue[value.name] = convertArray(value.children);
            returnArray.push(returnValue);
        }
    });
    return returnArray;
};
var target = [
    {
        'name': 'animal',
        'children': [
            {
                'name': 'dog',
                'children': [
                    {
                        'name': 'dachshund',
                        'children': []
                    }
                ]
            },
            {
                'name': 'cat',
                'children': [
                    {
                        'name': 'russian_blue',
                        'children': []
                    },
                    {
                        'name': 'bengal',
                        'children': []
                    }
                ]
            }
        ]
    },
    {
        'name': 'fruit',
        'children': [
            {
                'name': 'apple',
                'children': []
            }
        ]
    },
    {
        'name': 'sweets',
        'children': [
            {
                'name': 'ice_cream',
                'children': [
                    {
                        'name': 'chocolate',
                        'children': [
                            {
                                'name': 'cone',
                                'children': []
                            },
                            {
                                'name': 'cup',
                                'children': []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
var result = convertArray(target);
console.log('convert result:');
console.log(JSON.stringify(result, null, 2));
