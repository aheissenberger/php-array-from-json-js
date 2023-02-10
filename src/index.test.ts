import { expect, suite, test } from 'vitest'

import { json2phpArray, js2phpArray } from './index'

suite('Literal', () => {
    test('Null', () => {
        const json = "null"
        const expected = "NULL";
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('Number', () => {
        const json = "1"
        const expected = "1";
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })

    test('Boolean', () => {
        {
            const json = "true"
            const expected = "true";
            const res = json2phpArray(json);
            expect(res).eq(expected)
        }
        {
            const json = "false"
            const expected = "false";
            const res = json2phpArray(json);
            expect(res).eq(expected)
        }
    })
    test('String Simple', () => {
        const json = '"Hallo117"'
        const expected = '"Hallo117"';
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })

    test('String with single quote', () => {
        const json = '"Hallo\'117"'
        const expected = '"Hallo\'117"';
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('String with double quote', () => {
        const json = `"Hallo\\"117"`
        const expected = "\"Hallo\\\"117\"";
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('String with line breaks', () => {
        const json = `"Hallo\\n117"`
        const expected = `"Hallo\\n117"`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
})

suite('Array', () => {
    test('empty', () => {
        const json = '[]'
        const expected = '[]';
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('one number', () => {
        const json = '[1]'
        const expected = '[1]';
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('multiple numbers', () => {
        const json = '[1,2,3]'
        const expected = '[1,2,3]';
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('simple string', () => {
        const json = `["string"]`
        const expected = `["string"]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('multiple strings', () => {
        const json = `["string1","string2"]`
        const expected = `["string1","string2"]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('mixed literals', () => {
        const json = `[null,1,"string",true]`
        const expected = `[NULL,1,"string",true]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
})

suite('Object', () => {
    test('empty', () => {
        const json = '{}'
        const expected = '[]';
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('one property with a string', () => {
        const json = '{"key":"value"}'
        const expected = '["key"=>"value"]';
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('one property with a number', () => {
        const json = `{"key":1}`
        const expected = `["key"=>1]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('one property mixed literals', () => {
        const json = `{"key1":1,"key2":"string","key3":true,"key4":null}`
        const expected = `["key1"=>1,"key2"=>"string","key3"=>true,"key4"=>NULL]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('key with single quote', () => {
        const json = `{"ke'y1":1}`
        const expected = `["ke'y1"=>1]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('key with double quote', () => {
        const json = `{"ke\\"y1":1}`
        const expected = `["ke\\\"y1"=>1]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
})

suite('Object Array', () => {
    test('one property with a array', () => {
        const json = `{"key1":1,"key2":[]}`
        const expected = `["key1"=>1,"key2"=>[]]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
    test('array with object', () => {
        const json = `[{"key1":1},[1]]`
        const expected = `[["key1"=>1],[1]]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
})


suite('complex', () => {
    test('one property with a array', () => {
        const json = `{"key1":1,"key2":[{"a":[{"b":{"c":1}}]}]}`
        const expected = `["key1"=>1,"key2"=>[["a"=>[["b"=>["c"=>1]]]]]]`;
        const res = json2phpArray(json);
        expect(res).eq(expected)
    })
})

suite('js', () => {
    test('one property with a array', () => {
        const js = `{key1:1,"key2":[{a:[{"b":{"c":1}}]}]}`
        const expected = `["key1"=>1,"key2"=>[["a"=>[["b"=>["c"=>1]]]]]]`;
        const res = js2phpArray(js);
        expect(res).eq(expected)
    })
    test('one property with a array', () => {
        const js = `[undefined]`
        const expected = `[NULL]`;
        const res = js2phpArray(js);
        expect(res).eq(expected)
    })
    test('sparse array', () => {
        const js = `[1,,2]`
        const expected = `[1,NULL,2]`;
        const res = js2phpArray(js);
        expect(res).eq(expected)
    })
    test('function', () => {
        const js = `{key:()=>("string")}`
        expect(() => js2phpArray(js)).toThrowError(TypeError)
    })
})

