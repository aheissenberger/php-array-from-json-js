import obj2phpArray from './obj2phparray'

export function json2phpArray(json: string) {
    const obj = JSON.parse(json)
    return obj2phpArray(obj)
}

export function js2phpArray(js: string) {
    const obj = new Function(`return ${js}`)();
    return obj2phpArray(obj)
}