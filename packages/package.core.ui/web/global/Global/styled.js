import styled from 'styled-components'
import {motion} from 'framer-motion'

const GlobalStyled = styled('div').attrs(props => ({
    'data-kind': 'global',
    'data-component': `${props.meta.class}`,
    'data-rna': `${props.meta['@component']}`,
    'data-dna': `${props.meta['@dna']}`,
    className: `${props.meta.class} ${props.dna.ui['theme.decorate.class'] || ''}`
}))`
    --styled: '/packages/package.core.ui/web/global/Global/styled.js';
    min-height: 100%;

    ${props => props.context.theme.CSS(props)};
`

export default GlobalStyled