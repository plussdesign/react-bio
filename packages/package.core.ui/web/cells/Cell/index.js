import React, {useRef, useReducer, memo} from 'react'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {get} from 'lodash'

/**
 * Reducer
 */
function reducer(state, [type, payload]) {
    switch (type) {
        case 'ON_CHANGE':
            return {...state, user: payload}
        case 'ON_RESET':
            return {...state, value: ''}
        default:
            return state
    }
}

function Cell(props) {
    /**
     * Default Props
     */
    if (!props.fn.onValueUpdate) {
        props.fn.onValueUpdate = () => {}
    }

    const [state, dispatch] = useReducer(reducer, {})

    const store = useSelector(
        store =>
            Object.entries(props.dna.data.selectors).reduce((selectors, [key, value]) => {
                if (typeof value === 'object') {
                    selectors[key] = get(store, value)
                } else {
                    selectors[key] = {value: get(store, value)}
                }
                return selectors
            }, {}),
        shallowEqual
    )

    /**
     * Intercept Element Actions
     */
    function onKeyUp(payload) {
        payload.data.selector = props.dna.data.selectors[payload.data.selector]
        props.fn.onKeyUp(payload)
    }

    function onValueUpdate(payload) {
        payload.data.selector = props.dna.data.selectors[payload.data.selector]
        props.fn.onValueUpdate(payload)
    }

    const children = props.children.map((child, i) =>
        React.cloneElement(child, {
            key: child.props.meta['@dna'],
            data: {
                init: child.props.data.init,
                ...store
            },
            fn: {
                ...child.props.fn,
                onKeyUp,
                onValueUpdate
            }
        })
    )

    console.log('RENDER CELL', store)
    return children
}

export default Cell
