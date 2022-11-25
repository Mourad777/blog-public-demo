import styled from "styled-components";
import { primaryColor } from "./utility";

export const StyledPostRow = styled.div`
border: ${primaryColor} solid;
border-width: ${props => props.isLargeMobileLandscape ? 20 : props.index === 0 ? "40" : "20"
  }px 20px ${props => props.isLargeMobileLandscape ? 20 : props.index === 2 ? "40" : "20"
  }px 20px;
position: relative;
margin-left: 0;
padding-left: ${props => props.index % 2 === 0 && !(props.winSize === 1) ? '50px' : 0};
margin-right: ${props => props.index % 2 === 0 && !(props.winSize === 1) ? '-50px' : 0};
`;


export const StyledHeroSectionTextContainer = styled.div`
height:100vh;
`;


export const StyledLatestPostsTopLayer = styled.div`
width: "100%";
background-color: ${primaryColor};
height: 80px;
position:relative;
`;


export const StyledLatestPostsOuterWrapper = styled.div`
display:flex;
height:100%;
`;

export const StyledLatestPostsInnerWrapper = styled.div`
margin: "auto";
flex-grow: 1;
border-top:${props => props.height > 1100 ? `200px solid ${primaryColor}` : ''};
max-width: ${props => props.isLargeMobileLandscape ? 400 : 600}px;
`;

export const StyledDestinationsSection = styled.section`
height: 100vh;
background: rgba(236, 231, 226);
flex-direction: column;
justify-content: space-around;
display: flex;
box-sizing: border-box;
`;

export const StyledMap = styled.img`
height: auto;
width: ${props => props.width}%;
background-repeat: no-repeat;
z-index:-3;
position:absolute;
left:50%;
top:50%;
transform:translateX(-50%) translateY(-50%);

`;

export const StyledMapOverlay = styled.div`
background: rgba(236, 231, 226,0.8);
height: 4000px;
width: 100%;
background-repeat: no-repeat;
background-position: ${props => props.windowWidth === 1 ? 'left -160px top -480px' : 'left -160px top -680px'};
background-size: ${props => props.windowWidth === 1 ? 'auto' : '300em'};
position: absolute;
z-index: -9;
`;


export const StyledLatestPostsTitle = styled.svg`
z-index:0;
position: absolute;
top:
    ${props => props.winSize === 1
    ? 'calc(100vh - 120px)'
    : 'calc(100vh - 230px)'};
left: ${props => props.winSize === 1 ? '48%' : '50%'};
width: ${props => props.winSize === 1 ? '500px' : '900px'};
transform:translateX(-33%);
fill: white;
`;

export const StyledWorldMapTitle = styled.h3`
font-family: Mulish, sans-serif;
text-align: center;
color: black;
`;

export const StyledContactTitle = styled.svg`
z-index:1;
position: absolute;
left: 50%;
top:120px;
-webkit-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
width: ${props => props.winSize === 1 ? '300px' : '435px'};
fill: white;
`;

export const StyledInputGroup = styled.div`
display:flex;
flex-direction:column;
padding-top:10px;
`;
export const StyledInputLabel = styled.span`
color: white;
padding-bottom:15px;
`;

export const StyledInputError = styled.span`
color: #d10000;
padding:10px;
`;

export const StyledTextInput = styled.input`
height:30px;
color:black;
font-size:1.2em;
border:none;
&:focus {
    outline:solid;
    outline-color:rgb(236, 231, 226);
    outline-width:3px;
}
`;

export const StyledTextareaInput = styled.textarea`
color:black;
border:none;
&:focus {
    outline:solid;
    outline-color:rgb(236, 231, 226);
    outline-width:3px;
}
`;

export const StyledContactFormSubmitButton = styled.button`
    width: 100%;
    margin-top: 35px;
    height: 40px;
    border: none;
    background: white;
    color:rgb(216, 161, 114);
`;

export const StyledPostContainer = styled.div`
position:fixed;
left: 50%;
top: 50%;
padding:0 40px 0 40px;
-webkit-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
height:80vh;
width:90%;
max-width:700px;
background:white;
z-index:4;
overflow-y:scroll;
`;


export const StyledFormTextInput = styled.input`
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0;
    outline: 0;
    -webkit-appearance: none;
    tap-highlight-color: rgba(255,255,255,0);
    line-height: 1.21428571em;
    padding: .67857143em 1em;
    font-size: 1em;
    background: #fff;
    border: 1px solid rgba(34,36,38,.15);
    color: rgba(0,0,0,.87);
    border-radius: .28571429rem;
    box-shadow: 0 0 0 0 transparent inset;
    transition: color .1s ease,border-color .1s ease;
    width:100%;
    &:focus {
        color: rgba(0,0,0,.95);
        border-color: #85b7d9;
        border-radius: .28571429rem;
        background: #fff;
        box-shadow: 0 0 0 0 rgb(34 36 38 / 35%) inset;
    }
`



export const StyledBlueButton = styled.button`
    width:${props => props.maxWidth ? '100%' : ''};
    background-color: #2185d0;
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    outline: 0;
    border: none;
    vertical-align: baseline;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0 .25em 0 0;
    padding: .78571429em 1.5em .78571429em;
    text-transform: none;
    text-shadow: none;
    font-weight: 700;
    line-height: 1em;
    font-style: normal;
    text-align: center;
    text-decoration: none;
    border-radius: .28571429rem;
    font-size: 1em;
    color: #fff;
    &:hover {
        background-color: #1678c2;
        color: #fff;
        text-shadow: none;
    }
`

export const StyledRedButton = styled.button`
    width:${props => props.maxWidth ? '100%' : ''};
    background-color: #c62828;
    cursor: pointer;
    display: inline-block;
    min-height: 0.8em;
    outline: 0;
    border: none;
    vertical-align: baseline;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0 .25em 0 0;
    padding: .78571429em 1.5em .78571429em;
    text-transform: none;
    text-shadow: none;
    font-weight: 700;
    line-height: 1em;
    font-style: normal;
    text-align: center;
    text-decoration: none;
    border-radius: .28571429rem;
    font-size: 1em;
    color: #fff;
    &:hover {
        background-color: #b71c1c;
        color: #fff;
        text-shadow: none;
    }
`

export const StyledSubmitButton = styled.button`
    width:100%;
    background-color: #2185d0;
    cursor: pointer;
    display: inline-block;
    min-height: 1.5em;
    outline: 0;
    border: none;
    vertical-align: baseline;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0 .25em 0 0;
    padding: .78571429em 1.5em .78571429em;
    text-transform: none;
    text-shadow: none;
    font-weight: 700;
    line-height: 1em;
    font-style: normal;
    text-align: center;
    text-decoration: none;
    border-radius: .28571429rem;
    font-size: 1em;
    color: #fff;
    background-color: #21ba45;
    &:hover {
        background-color: #16ab39;
        color: #fff;
        text-shadow: none;
    }
`

export const StyledThumbnailPreview = styled.div`
height:${props => props.small ? '70px' : '250px'};
background-color:#e2e2e2;
background-image:${props => props.file ? `url("${props.file}")` : '#e2e2e2'}; 
width: ${props => props.small ? '100px' : '100%'};
max-width:500px;
margin-bottom: 20px; 
border-radius: 10px;
background-position: center;
background-size: cover;
background-repeat: no-repeat;
`

export const StyledLoader = styled.div`
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${props => props.background};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
  
`


export const StyledLoaderWrapper = styled.div`
position: absolute;
top: 30%;
left: 50%;
transform: translate(-50%);
`