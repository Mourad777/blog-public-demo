import React, { useEffect, useRef, useState } from 'react';
import './SearchInput.css'
import { Icon } from 'semantic-ui-react'
import { getSearchInputStyle } from '../utility';
import { useHistory } from 'react-router-dom';
import countryCodes from '../Countries/country-codes.json'

function useOutsideAlerter(ref, handleOutsideClick) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleOutsideClick()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const Search = React.memo(({ posts, photos, videos, countryThumbnails, winSize, isPageLoaded, setLastViewedSection }) => {

    const adjustedPhotos = photos.map(p => ({
        type: 'photo',
        id: p.id, country: p.country || '',
        summary: (p.description || '').toLowerCase(),
        author: (p.photographer || '').toLowerCase(),
        title: (p.title || '').toLowerCase(),
        content: '',
        image: p.src,
        tags: (JSON.parse(p.tags) || []).map(t => t.toLowerCase()),

    }));
    const adjustedVideos = videos.map(v => ({
        type: 'video',
        id: v.id,
        country: v.country || '',
        summary: (v.description || '').toLowerCase(),
        author: (v.videographer || '').toLowerCase(),
        title: (v.title || '').toLowerCase(),
        content: '',
        image: v.thumbnail,
        tags: (JSON.parse(v.tags) || []).map(t => t.toLowerCase()),
    }));
    const adjustedPosts = posts.map(p => ({
        type: 'post',
        id: p.id,
        country: p.country || '',
        summary: (p.summary || '').toLowerCase(),
        author: (p.author || '').toLowerCase(),
        title: (p.title || '').toLowerCase(),
        content: (p.content || '').toLowerCase(),
        image: p.image,
        tags: (JSON.parse(p.tags) || []).map(t => t.toLowerCase()),
    }));

    const [searchValue, setSearchValue] = useState('');
    const history = useHistory();

    const countries =
        [...posts, ...photos, ...videos]
            .filter(item => !!item.country)
            .map(item => ({
                title: countryCodes[item.country.toUpperCase()].toLowerCase(),
                type: 'country',
                id: item.country,
                summary: '',
                author: '',
                content: '',
            }));

    const categories = [];

    [...posts, ...photos, ...videos]
        .forEach(item => {
            item.categories.forEach(cat => {
                if (!categories.map(c => c.name).includes(cat.name)) {
                    categories.push(cat)

                }
            })

        });

    const adjustedCategories = categories.map(c => ({
        title: c.name,
        type: 'category',
        id: c.name,
        summary: '',
        author: '',
        content: '',
    }))


    const options = [
        ...adjustedPhotos,
        ...adjustedVideos,
        ...adjustedPosts,
        ...countries,
        ...adjustedCategories
    ]

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const handleOutsideClick = () => {
        setSearchValue('');
    }

    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, handleOutsideClick);

    const filteredResults = options
        .filter(item => (
            item.title.includes(searchValue.toLowerCase()) ||
            (item.tags || []).includes(searchValue.toLowerCase()) ||
            item.summary.includes(searchValue.toLowerCase()) ||
            item.author.includes(searchValue.toLowerCase()) ||
            item.content.includes(searchValue.toLowerCase())) &&
            !!searchValue.toLowerCase());

    const filteredResultsWithoutDuplicates = [...filteredResults.reduce((itemsMap, item) =>
        itemsMap.has(item.id && item.type) ? itemsMap : itemsMap.set(item.id, item)
        , new Map()).values()];




    const handleResult = ({ type, selectedResult }) => {
        if (type === 'photo') history.push(`/photo/${selectedResult}`);
        if (type === 'video') history.push(`/video/${selectedResult}`);
        if (type === 'post') history.push(`/post/${selectedResult}`);
        if (type === 'country') history.push(`/destination/${selectedResult}`);
        if (type === 'category') history.push(`/category/${selectedResult}`);
        setLastViewedSection(null);
    }


    return (
        <div
            style={getSearchInputStyle(winSize)}
            ref={wrapperRef}
        >
            <div className="search-box">
                <button className="btn-search" style={{ color: 'rgb(204,134,74)' }}><Icon name="search" /></button>
                <input value={searchValue} onChange={handleSearchValue} type="text" className="input-search" placeholder="Type to Search..."></input>
            </div>
            <div style={{
                margin: 'auto',
                minWidth: 300,
                transform: 'translateX(-50%)',
                left: '50%',
                position: 'absolute',
                top: 60,
                zIndex: isPageLoaded ? 100 : 10,
            }}

            >
                <div style={{ background: '#fff', borderRadius: 5, width: 300 }} >
                    {
                        filteredResultsWithoutDuplicates.map(res => {
                            let image;
                            if (res.type === 'country') {
                                image = (countryThumbnails.find(t => t.country === res.id) || {}).image || '/assets/icons/country-icon.jpg';
                            }
                            if (res.type === 'category') {
                                image =
                                    // countryThumbnails.find(t => t.country === res.id)||
                                    '/assets/icons/category-icon.jpg';
                            }
                            if (res.type === 'post') {
                                image = res.image || '/assets/icons/post-icon.jpg';
                            }
                            if (res.type === 'photo') {
                                image = res.image || '/assets/icons/photo-icon.jpg';
                            }
                            if (res.type === 'video') {
                                image = res.image || '/assets/icons/video-icon.jpg';
                            }
                            return (
                                <div onClick={() => handleResult({ type: res.type, selectedResult: res.id })} key={`search-result[${res.id}][${res.type}]`} style={{ display: 'flex', alignItems: 'center', padding: 5, cursor: 'pointer' }}>
                                    <div ><img style={{
                                        width: '100%',
                                        maxWidth: 50,
                                    }} src={image} /></div>
                                    <p style={{ padding: 5 }}>{res.title}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>

    )
})

export default Search;