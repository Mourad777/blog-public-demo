import axios from 'axios'
import { AppUrl } from '../pages/utility'
import { processComments } from '../helper-functions'


//comments api
export const getComments = async (docId, docType, setComments, setIsLoading) => {
    setIsLoading(true)
    let res = {};
    try {
        res = await axios.get(`${AppUrl}api/public-comments/${docType}/${docId}`);
    } catch (e) {
        setIsLoading(false)
        console.log('Fetch comments response error', e.response);
    }
    console.log('Fetch comments response', res)
    const comments = res.data;
    setComments(processComments(comments));
    setIsLoading(false)
}

export const getDocument = async (docId, docType, setDocument, setIsLoading) => {
    setIsLoading(true)
    let res = {};
    try {
        res = await axios.get(`${AppUrl}api/${docType}s/${docId}`);
    } catch (e) {
        console.log('Respost fetch post or video', e.response)
        setIsLoading(false)
    }
    console.log('Respost fetch post or video', res)
    const doc = res.data;
    setDocument(doc);
    setIsLoading(false)

}

//countries api

export const getCountryThumbnails = async (setCountryThumbnails, setIsLoading) => {
    setIsLoading(true)
    let fetchCountryThumbnailsResponse = {};
    try {
        fetchCountryThumbnailsResponse = await axios.get(`${AppUrl}api/countries`);
    } catch (e) {
        console.log('Fetch Country Thumbnails Error', e.response);
        setIsLoading(false)
    }
    setIsLoading(false)
    console.log('Fetch Country Thumbnails Response', fetchCountryThumbnailsResponse);
    setCountryThumbnails(fetchCountryThumbnailsResponse.data);
}

//categories api
export const getCategories = async () => {
    let categoriesResponse = {};
    try {
        categoriesResponse = await axios.get(`${AppUrl}api/categories`);
    } catch (e) {
        console.log('Fetch categories response error', e.response)
    }
    console.log('Fetch categories response', categoriesResponse)
    return categoriesResponse;
}

export const getCategoryContent = async (countryIso, selectedCategory, setPosts, setPhotos, setVideos) => {
    let url;
    if (countryIso) {
        url = `${AppUrl}api/countries/${countryIso}`;
    }
    if (selectedCategory) {
        url = `${AppUrl}api/categories/${selectedCategory}`
    }
    let contentResponse = {};
    try {
        contentResponse = await axios.get(url);
    } catch (e) {
        console.log('Content response error', e.response)
    }
    console.log('content response', contentResponse)
    setPosts((contentResponse.data || {}).posts || []);
    setPhotos((contentResponse.data || {}).photos || []);
    setVideos((contentResponse.data || {}).videos || []);
}

//updates the order of photos or videos in a gallery after
//dragging and dropping
export const updateOrder = async (items, galleryType) => {
    const updateOrderUrl = `${AppUrl}api/configurations/update`;
    const order = items.map(item => item.id);
    const configFormData = new FormData();
    configFormData.append(galleryType, JSON.stringify(order));
    let resUpdateOrder = {};
    try {
        resUpdateOrder = await axios.post(updateOrderUrl, configFormData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    } catch (e) {
        console.log('Update photo order response error: ', e.response)

    }
    console.log('Update photo order response: ', resUpdateOrder)
}

export const getPhotos = async (setItems, setIsLoading) => {
    const fetchPhotosUrl = `${AppUrl}api/photos`;
    let resFetchPhotos = {};
    setIsLoading(true);
    try {
        resFetchPhotos = await axios.get(fetchPhotosUrl);

    } catch (e) {
        console.log('Fetch photos response error', e.response);

        setIsLoading(false)
    }

    console.log('Fetch photos response', resFetchPhotos);

    const fetchConfigUrl = `${AppUrl}api/configurations`;
    let resFetchConfigurations = {};
    try {
        resFetchConfigurations = await axios.get(fetchConfigUrl);

    } catch (e) {
        console.log('Fetch configuration response error', e.response);

        setIsLoading(false)
    }

    console.log('Fetch config response', resFetchConfigurations);

    setIsLoading(false)
    const formattedPhotos = (resFetchPhotos.data || []).map(item => {
        return {
            ...item,
            src: item.src,
            height: 1,
            width: 1.5,
            id: item.id,
        }
    });

    if (resFetchConfigurations.data !== 'no_config' && (resFetchConfigurations.data || {}).photo_gallery_order) {
        const order = JSON.parse(resFetchConfigurations.data.photo_gallery_order) || [];
        const orderedFormattedPhotos = [];
        order.forEach(number => {
            formattedPhotos.forEach(photo => {
                if (photo.id === number) {
                    orderedFormattedPhotos.push(photo);
                }
            })
        });
        setItems(orderedFormattedPhotos)
    } else {
        setItems(formattedPhotos)
    }
}

export const getPhoto = async (id, setPhoto, setIsLoading) => {
    setIsLoading(true);
    let photoResponse = {};
    try {
        photoResponse = await axios.get(`${AppUrl}api/photo/${id}`);
    } catch (e) {
        console.log('Fetch Photo Error', e.response)
        setIsLoading(false)
    }
    console.log('Fetch Photo Response', photoResponse);
    setPhoto(photoResponse.data);
    setIsLoading(false);
}




export const getVideos = async (setItems, setIsLoading) => {
    const fetchVideosUrl = `${AppUrl}api/videos`;
    setIsLoading(true);
    let resFetchVideos = {};
    try {
        resFetchVideos = await axios.get(fetchVideosUrl);
    } catch (e) {
        console.log('Fetch videos response error', e.response);
        setIsLoading(false)
    }

    console.log('Fetch videos response', resFetchVideos);

    const fetchConfigUrl = `${AppUrl}api/configurations`;
    let resFetchConfigurations = {};
    try {
        resFetchConfigurations = await axios.get(fetchConfigUrl);
    } catch (e) {
        console.log('Fetch configuration response error', e.response);
        setIsLoading(false)
    }
    console.log('Fetch config response', resFetchConfigurations);

    setIsLoading(false)
    const formattedVideos = (resFetchVideos.data || []).map(item => {
        return {
            ...item,
            src: item.thumbnail || '/assets/icons/video-icon.jpg',
            height: 1,
            width: 1.5,
            commentCount: item.comment_count,
            id: item.id,
            videoUrl: item.src
        }
    });

    if (resFetchConfigurations.data !== 'no_config' && (resFetchConfigurations.data || {}).video_gallery_order) {
        const order = JSON.parse(resFetchConfigurations.data.video_gallery_order) || [];
        const orderedFormattedVideos = [];
        order.forEach(number => {
            formattedVideos.forEach(video => {
                if (video.id === number) {
                    orderedFormattedVideos.push(video);
                }
            })
        });
        setItems(orderedFormattedVideos)
    } else {
        setItems(formattedVideos)
    }
}

export const getVideo = async (id, setVideo, setIsLoading) => {
    setIsLoading(true);
    let videoResponse = {};
    try {
        videoResponse = await axios.get(`${AppUrl}api/videos/${id}`);
    } catch (e) {
        console.log('Fetch Video Error', e)
        setIsLoading(false)
    }
    console.log('Fetch Video Response', videoResponse);
    setVideo(videoResponse.data);
    setIsLoading(false);
}

export const getPost = async (id, setPost, setIsLoading) => {
    setIsLoading(true);
    let postResponse = {};
    try {
        postResponse = await axios.get(`${AppUrl}api/public-posts/${id}`);
    } catch (e) {
        console.log('Fetch Post Error', e.response)
        setIsLoading(false)
    }
    console.log('Fetch Post Response', postResponse);
    setPost(postResponse.data);
    setIsLoading(false);
}

export const getPosts = async (setPosts, setIsLoading) => {
    let res = {};
    setIsLoading(true)
    try {
        res = await axios.get(`${AppUrl}api/public-posts`);

    } catch (e) {
        console.log('Fetch posts error', e.response)
        setIsLoading(false)
    }
    console.log('Fetch posts response', res)
    const posts = res.data;
    if (posts) {

        function compare(a, b) {
            if ((new Date(a.date_written).getTime() || new Date(a.created_at).getTime()) < (new Date(b.date_written).getTime() || new Date(b.created_at).getTime())) {
                return 1;
            }
            if ((new Date(a.date_written).getTime() || new Date(a.created_at).getTime()) > (new Date(b.date_written).getTime() || new Date(b.created_at).getTime())) {
                return -1;
            }
            return 0;
        }

        // posts.sort(compare);

        setPosts(posts.sort(compare));
    }
    setIsLoading(false)
}

export const getConfiguration = async (setIsLoading) => {
    const url = `${AppUrl}api/configurations`;
    let configResponse = {};
    setIsLoading(true);
    try {
        configResponse = await axios.get(url);
    } catch (e) {
        setIsLoading(false)
        console.log('Fetch configuration response error: ', e.response)
    }

    setIsLoading(false)
    console.log('Fetch configuration response: ', configResponse);
    return configResponse.data || {};
}