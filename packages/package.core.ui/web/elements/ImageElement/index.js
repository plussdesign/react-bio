import React from 'react'
import {hooks} from '../../../../package.core.fn'
import ImageElementStyled from './styled'

export default function ImageElement(props) {
    /**
     * Data
     */

    const [data, selectors] = hooks.elements.useDataSelectors(props, ['src', 'alt', 'caption'])

    /**
     * Render
     */

    console.log(`RENDER ELEMENT: ImageElement ${props.meta['@dna']}`, props)
    return (
        <ImageElementStyled
            meta={props.meta}
            dna={props.dna}
            context={props.context}
            style={props.dna.ui['theme.style.css']}
        >
            <img src={data.src} alt={data.alt} />
            <figcaption>{data.caption}</figcaption>
        </ImageElementStyled>
    )
}

ImageElement.defaultProps = {
    dna: {
        set: {},
        ui: {},
        actions: {}
    }
}