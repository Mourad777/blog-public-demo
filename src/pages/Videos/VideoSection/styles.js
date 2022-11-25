import styled from 'styled-components'
import { primaryColor } from '../../utility';

export const StyledSectionContainer = styled.div`
height: 100vh; 
min-height: calc(100vh - 56px); 
z-index: 1; 
background: rgb(236, 231, 226); 
width: 100%; 
position: relative;
`;

export const StyledVideosContainer = styled.div`
overflow: hidden;
width: 85vw;
max-width: 900px;
margin: auto;
display: flex;
justify-content: space-around;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
position: absolute;
`;

export const StyledVideoWrapper = styled.div`
background: #fff;
cursor: pointer;
float: left;
position: relative;
width: ${props=>props.width};
height: 50vh;
overflow: hidden;
min-height: 205px;
max-height: 600px;
`;

export const StyledThumbnail = styled.img`
max-height: 300px;
width: 100%;
height: ${props=>props.isLargeMobileLandscape ? '40vh' : '25vh'};
object-fit: ${props=>!props.video.thumbnail && props.isLargeMobileLandscape ? 'scale-down' : 'cover'};
`;

export const StyledTitleWrapper = styled.div`
min-height: 60px; 
max-height: 100px; 
height: 10vh; 
background: #fff;
`;

export const StyledTitle = styled.p`
text-align: center; 
padding-top: 10px; 
font-family: Mulish; 
font-weight: bold;
font-size: 1.2em;
`;

