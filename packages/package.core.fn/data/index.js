/**
 * storeEquality
 */

function is(x, y) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y
    }

    if (typeof x === 'object' && typeof y === 'object') {
        const keysA = Object.keys(x)
        for (let i = 0; i < keysA.length; i++) {
            if (!is(x[keysA[i]], y[keysA[i]])) {
                return false
            }
        }
        return true
    }
    return false
}

export function storeEquality(objA, objB) {
    if (is(objA, objB)) {
        return true
    }

    const keysA = Object.keys(objA)
    for (let i = 0; i < keysA.length; i++) {
        if (!is(objA[keysA[i]], objB[keysA[i]])) {
            return false
        }
    }
    return true
}

/**
 * objectify Array
 */

export function objectify(array) {
    return array.reduce((acc, cur) => {
        acc[cur.role || cur.id] = cur
        cur.isExtendByFieldGroups =
            (Array.isArray(cur.isExtendByFieldGroups) &&
                cur.isExtendByFieldGroups.reduce((acc, cur) => {
                    acc[cur.role || cur.id] = cur
                    return acc
                }, {})) ||
            []
        acc[cur.role || cur.id].hasChildContentNodes =
            (Array.isArray(cur.hasChildContentNodes) && objectify(cur.hasChildContentNodes)) || []
        return acc
    }, {})
}

/**
 * getDepthOfTree
 */

export function getDepthOfTree(rootObject, childrenKey) {
    let depth = 0
    if (rootObject[childrenKey]) {
        rootObject[childrenKey].forEach(d => {
            const tmpDepth = getDepthOfTree(d, childrenKey)
            if (tmpDepth > depth) {
                depth = tmpDepth
            }
        })
    }
    return 1 + depth
}
