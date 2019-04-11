const actions = {
    $set: (source, value) => value,
    $unset: (source, names) => {
        const copy = {
            ...source
        };
        for (const name of names) {
            delete copy[name];
        }
        return copy;
    },
    $push: (source, value) => [...source, value],
    $append: (source, value) => [...source, ...value],
    $apply: (source, func) => func(source),
    $filter: (source, condition) => source.filter(condition),
    $merge: (source, addition) => ({
        ...source,
        ...addition
    })
};
const internal_copyObject = (obj, createIfVoid = false) => {
    if (Array.isArray(obj) === true) {
        return [...obj];
    }
    if (obj === undefined && createIfVoid === true) {
        return {};
    }
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    if (obj instanceof Map) {
        return new Map(obj);
    }
    if (obj instanceof Set) {
        return new Set(obj);
    }
    if (obj.constructor !== Object) {
        return obj;
    }
    return {
        ...obj
    };
};
const internal_setValues = (dest, key, n, value, create) => {
    const name = key[n];
    if (n === key.length - 1) {
        return actions[name](dest, value);
    } else {
        dest = internal_copyObject(dest, create);
        dest[name] = internal_setValues(dest[name], key, n + 1, value, create);
    }
    return dest;
};
const update = (source, obj, createIfUndefined = false) =>
    Object.keys(obj).reduce(
        (source, key) =>
            internal_setValues(
                source,
                key.split("."),
                0,
                obj[key],
                createIfUndefined
            ),
        source
    );
update.actions = actions;

export default update;