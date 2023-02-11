export default function obj2phpArray(obj: any) {
    return String(obj2phpArrayWriter(obj))
}

function obj2phpArrayWriter(obj: any): string | object {
    if (typeof obj === 'string') {
        return stringEscape(obj)
    } else if (obj === null || (typeof obj === 'undefined')) {
        return "null"
    } else if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false'
    } else if (typeof obj === 'number') {
        return Number(obj).toString()
    } else if (Array.isArray(obj)) {
        return `[${Array.from(obj).map(c => obj2phpArray(c)).join(',')}]`
    } else if (typeof obj === 'object') {
        return `[${Object.entries(obj).map(([key, value]) => (`${stringEscape(key)}=>${obj2phpArray(value)}`))}]`
    }
    throw new TypeError(`${typeof obj} is not suported!`)
}

function stringEscape(raw: string) {
    return JSON.stringify(raw)
}