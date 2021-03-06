import React from 'react'
import LockButton from '../../../elements/ButtonToggleElement'
import RegionControlStyled from './styled'

const RegionControl = props => (
    <RegionControlStyled>
        <LockButton name={props.name} isLocked={props.isLocked} onClick={props.onClick} />
    </RegionControlStyled>
)

RegionControl.propTypes = {}

export default RegionControl
