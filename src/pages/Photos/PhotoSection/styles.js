import styled from 'styled-components'
import { primaryColor } from '../../utility'

export const StyledSectionContainer = styled.div`
height: 100vh; 
min-height: calc(100vh - 56px); 
z-index: 1; 
background: ${primaryColor}; 
width: 100%; 
overflow: hidden; 
position: relative;
`

export const StyledImage = styled.img`
width: 100%;
height: 100%;
vertical-align: top;
object-fit: cover;
`
export const StyledFigure = styled.figure`
margin: 0; 
height: 100%;
`
export const StyledImageWrapper = styled.figure`
position: relative;
display: block;
height: ${props => !!props.gridWidth ? `${(props.gridWidth - 6) / 3}px` : ''};
cursor: pointer;
`

export const StyledGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, minmax(100px, 293px));
justify-content: center;
grid-gap: 3px;
`
export const StyledGridWrapper = styled.div`
overflow: hidden;
max-width: 550px;
margin: auto;
width: ${props => props.winSize === 1 ? '100%' : '60%'};
left: 50%;
top: 55%;
transform: translate(-50%,-50%);
position: absolute;
`