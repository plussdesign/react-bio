export default function(props, keys) {
    !props.data &&
        console.log(
            'Bio Debug Message: Missing bio configuration object for Element component. Check parent Block/Element.'
        )
    if (!props.data.store) {
        props.data.store = {}
    }
    const data = {}
    const selectors = {}

    keys.forEach(key => {
        data[key] = props.data.store[key] || props.data.init[key]
        selectors[key] = `${props.meta.name}.${key}`
    })
    return [data, selectors]
}
