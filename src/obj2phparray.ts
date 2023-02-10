export default function obj2phpArray(obj: object): string | object {
    if (typeof obj === 'string') {
        return stringEscape2(obj)
    } else if (obj === null) {
        return "NULL"
    } else if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false'
    } else if (typeof obj === 'number') {
        return Number(obj).toString()
    } else if (Array.isArray(obj)) {
        return `[${obj.map(c => obj2phpArray(c)).join(',')}]`
    } else if (typeof obj === 'object') {
        return `[${Object.entries(obj).map(([key, value]) => (`"${stringEscape(key)}"=>${obj2phpArray(value)}`))}]`
    }
    throw new TypeError(`${typeof obj} is not suuported!`)
}

function stringEscape(raw: string) {
    return raw.replaceAll('"', '\"')
        .replaceAll("\n", '\\n')
        .replaceAll("\r", '\\r')
}

function stringEscape2(raw: string) {
    return JSON.stringify(raw)
}