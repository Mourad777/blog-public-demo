import React from "react";
import styled from "styled-components";
import "./navbar.module.css";
import { gsap } from 'gsap/all'
import { primaryColor } from "../../pages/utility";

const NavText = styled.span`
    font-size: 1em;
    opacity: 0;
    color:${props => props.section % 2 === 0 ? '#fff' : primaryColor};
    transition: all 0.3s ease-in;
`;

const Bullet = styled.div`
    height: 10px;
    width: 10px;
    margin-right: 30px;
    background-color: ${props => props.section % 2 === 0 ? '#fff' : primaryColor};
    border-radius: 50%;

    transition: all 0.3s ease-in;
    transform:${props => props.active ? 'scale(1.2)' : 'scale(1)'};
    position:absolute;
    top: 0; 
    bottom: 0; 
    left: 0; 
    right: 0;
    margin: auto;
    opacity:${props => props.active ? '1' : '0.7'};
`;

const BulletWrapper = styled.div`
    height: 20px !important;
    width: 20px !important;
    position:relative;
    margin-right:10px;
`;

const LinkWrapper = styled.div`
    display: flex;
    justify-content: start;
    min-width: 200px;

    align-items: center;
    &:hover ${NavText} {
        opacity: 0.7;
    }
    &:hover ${Bullet} {
        transform:scale(1.8);
    }
    color:${props => props.index % 2 === 0 ? 'black' : 'white'};
`;


export default ({ scrollSection, componentReferences,getInitialData }) => {
    const links = [
        { name: "Welcome", id: "hero-section", ref: componentReferences.welcome },
        { name: "Posts", id: "latest-posts-section", ref: componentReferences.posts },
        // selectedSection === 'posts' ? { name: "Posts", id: "posts-section",ref:componentReferences.destinations } : null,
        { name: "Destinations", id: "destinations-section", ref: componentReferences.destinations },
        // selectedSection === 'destination' ? { name: "Posts", id: "destinations-section-detail",ref:'' } : null,
        { name: "Photos", id: "photos-section", ref: componentReferences.photos },
        // selectedSection === 'photos' ? { name: "Photo detail", id: "photos-section-detail",ref:componentReferences.photos } : null,
        { name: "Videos", id: "videos-section", ref: componentReferences.videos },
        // selectedSection === 'videos' ? { name: "All videos", id: "videos-section-detail",ref:componentReferences.videos } : null,
        { name: "Contact", id: "contact-section", ref: componentReferences.contact }
    ].filter(item => item);

    const handleScroll = (ref) => {
        // getInitialData()
        gsap.to(window, { duration: 2, scrollTo: ref.current });
    }

    return (
        <div style={{ position: "fixed", top: "50%", right: -80, zIndex: 10 }}>
            <ul
                style={{
                    display: "flex",
                    listStyle: "none",
                    justifyContent: "space-around",
                    flexDirection: "column"
                }}
            >
                {links.map((link, i) => (
                    <li key={link.name} onClick={() => handleScroll(link.ref)} style={{ cursor: "pointer" }}>
                        <LinkWrapper index={i}>
                            <BulletWrapper>
                                <Bullet active={i === 0 && scrollSection <= 1 ? true : scrollSection === i + 1} section={scrollSection} />
                            </BulletWrapper>

                            <NavText section={scrollSection}  className="textLink">{link.name}</NavText>
                        </LinkWrapper>
                    </li>
                ))}
            </ul>
        </div>
    )
};
