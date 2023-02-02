const actions = {
    set: (source, value) => value,
    unset: (source, names) => {
        const copy = { ...source }
        for (const name of names) {
            delete copy[name]
        }
        return copy
    },
    push: (source, value) => [...source, value],
    append: (source, value) => [...source, ...value],
    apply: (source, func) => func(source),
    filter: (source, condition) => source.filter(condition),
    merge: (source, addition) => ({ ...source, ...addition })
}
const customActions = {
}

const isMap = Symbol("JS Map")
Map.prototype[isMap] = true
const isSet = Symbol("JS Set")
Set.prototype[isSet] = true

const copy = (value) => {
    if (value === undefined) {
        return {}
    }
    if (Array.isArray(value) === true) {
        return [...value]
    }
    if (typeof value !== "object" || value === null) {
        return value
    }
    if (value[isMap] === true) {
        return new Map(value)
    }
    if (value[isSet] === true) {
        return new Set(value)
    }
    if (value.constructor !== Object) {
        return value
    }
    return { ...value }
}
const applyChange = (current, path, newValue, index) => {
    const prop = path[index]
    if (index === (path.length - 1)) {
        const action = actions[prop] ?? customActions[prop]
        // if (action === undefined) {
        //     throw new Error(`${prop} is not a defined action`)
        // }
        return action(current, newValue)
    }

    const next = copy(current)
    // if (next[isMap] === true) {
    //     return next.set(
    //         prop,
    //         applyChange(
    //             next.get(prop),
    //             path,
    //             newValue,
    //             index + 1
    //         )
    //     )
    // }
    next[prop] = applyChange(
        next[prop],
        path,
        newValue,
        index + 1
    )
    return next
}

const parseKey = (key) =>
    [...key.match(/\[[^\]]+?\]|\.\$?\w+/g)]
        .map(
            key => key.startsWith("[")
                ? key.slice(2, -1)
                : key.slice(1)
        )
const update = (value, changeMap) =>
    Object.keys(changeMap)
    .reduce(
        (current, key) => applyChange(
            current,
            parseKey(key),
            changeMap[key],
            0
        ),
        value
    )
update.custom = customActions

export default update
