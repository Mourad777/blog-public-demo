import styled from 'styled-components'
import { primaryColor } from '../../utility';

export const StyledCameraSwitchLabel = styled.div`
color: #fff; 
margin-left: 10px; 
font-size: 1.2em;
`;

export const StyledCameraSwitchWrapper = styled.div`
margin-top: 20px; 
display: flex;
align-items:center;
`;

export const StyledCameraSwitchContainer = styled.div`
color: #fff;
padding-left: 30px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

export const StyledCameraSwitchContainerMain = styled.div`
height: 100%;
background-color: ${primaryColor};
width: 100%;
`;

export const StyledLocationLabel = styled.div`
display: flex; 
color: #fff4e1; 
background: ${primaryColor}; 
padding: 10px; 
cursor: pointer;
`;

export const StyledLabelWrapper = styled.div`
color: #fff4e1;
`;

export const StyledLabel = styled.p`
font-style: italic;
`;

export const StyledLabelContainer = styled.div`
color: #fff;
background:${primaryColor}
`;

export const StyledImage = styled.img`
border: 10px solid #fff;
height: 60vh;
width:${props => props.winSize === 1 ? "100%" : props.winSize === 2 ? '500px' : '800px'};
object-fit: contain;
`

export const StyledButtonWrapper = styled.div`
padding:20px;
`

export const StyledPhotoSectionContainer = styled.div`
background: #ece7e2;
height: 100%;
width: 100%;
`

export const StyledPhotoSectionContainerSecondary = styled.div`
opacity: ${props => props.photo ? 1 : 0};
transition: opacity 1s ease-in;
width: 100vw;
height: 100%;
z-index: 10;
position: fixed;
top: 0;
right: 0;
background-color: ${primaryColor};
`

export const StyledPhotoSectionContainerTertiary = styled.div`
left: 0;
margin: ${props => props.winSize === 1 ? "auto" : ""};
right: ${props => props.winSize === 1 ? 0 : ""};
position: absolute;
height: 100%;
width: 100vw;
`

export const StyledPhotoSectionContainerQuarternary = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`

export const StyledPhotoWrapperPrimary = styled.div`
position: relative;
display: flex;
align-items: center;
padding: 30px 30px 0 30px;
`

export const StyledPhotoWrapperSecondary = styled.div`
display: flex; 
flex-direction: column; 
background: black; 
position: relative;
`