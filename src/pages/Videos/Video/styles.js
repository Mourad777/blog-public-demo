import styled from 'styled-components'

export const StyledPlayerWrapper = styled.div`
max-width: 800px;
margin: auto;
`;

export const StyledHomeButtonWrapper = styled.div`
padding:20px;
`;

export const StyledVideoDescription = styled.div`
font-size: 1.2em; font-family: Mulish;
`;

export const StyledVideoDescriptionWrapper = styled.div`
padding: 20px; 
background: #fff; 
margin: 10px 0;
`;

export const StyledTitle = styled.h1`
text-align: center;
margin: 20px 0;
font-size: ${props=>props.winSize === 1 ? '2em' : '2.5em'};
font-family: Mulish;
color: white;
`;

export const StyledTitleWrapper = styled.div`
z-index: 1; 
top: 50px; 
left: 50%; 
transform: translateX(-50%); 
position: absolute;
background: rgb(0,0,0,0.6);
border-radius: 2px;
padding: 20px;
min-width: 300px;
`;

export const StyledHeader = styled.div`
position: relative;
width: 100%; 
height: 300px; 
overflow: hidden;
`;

export const StyledSectionContainer = styled.div`
background: #ece7e2; 
height: 100%; 
width: 100%; 
padding-bottom: 20px;
`;