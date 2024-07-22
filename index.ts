export type JsonValue = JsonArray | JsonObject | boolean | null | number | string

export interface JsonArray extends Array<JsonValue> {}

export interface JsonObject {
    [key: string]: JsonValue
}


/**
 * A deepCopyObject implementation which only works for JSON objects and arrays, and is faster than
 * JSON.parse(JSON.stringify(inObject)): https://www.measurethat.net/Benchmarks/Show/31442/0/jsonstringify-vs-structuredclone-vs-simple-deepcopyobje
 *
 * This is not recursive and should thus be more memory efficient, due to less stack frames
 */
export const deepCloneJson = <T extends JsonObject>(inObject: T): T => {
    if (typeof inObject !== 'object' || inObject === null) {
        return inObject
    }

    const stack: { source: JsonArray | JsonObject; target: any }[] = [
        { source: inObject, target: Array.isArray(inObject) ? [] : {} },
    ]
    const root = stack[0].target

    while (stack.length > 0) {
        const { source, target }= stack.pop() as { source: JsonObject; target: any }

        for (const key in source) {
            const value = source[key]
            if (typeof value === 'object' && value !== null) {
                target[key] = Array.isArray(value) ? [] : {}
                stack.push({ source: value, target: target[key] })
            } else {
                target[key] = value
            }
        }
    }

    return root
}
