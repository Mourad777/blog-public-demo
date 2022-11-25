import React, { useState, useEffect, useRef, Fragment } from 'react'
import { StyledFormTextInput, StyledBlueButton, StyledRedButton, StyledInputError } from '../StyledComponents';
import { List, TextArea, Form, Button } from 'semantic-ui-react'
import { AppUrl, getPusher, primaryColor, validateMessage } from '../utility';
import axios from 'axios';
import '../global-styles/tinymceReadonly.css'
import Avatar from 'react-avatar';
import { useHistory, useParams } from 'react-router';
import Loader from '../../components/Loader/Loader';
import { getComments, getPost, getPosts } from '../../api/util';
import { ScrollTrigger } from 'gsap/all';
import moment from 'moment';

const getRelatedPosts = (currentPost, posts) => {
    const allPostsExceptCurrent = (posts || []).filter(item => item.id !== currentPost.id);
    const currentPostTags = !!currentPost.tags ? JSON.parse(currentPost.tags) : [];
    const currentPostCategoriesIds = (currentPost.categories || []).map(item => {
        return item.id
    });
    const relatedPostIds = [];
    allPostsExceptCurrent.forEach(post => {
        if (!!post.tags) {
            JSON.parse(post.tags).forEach(tag => {
                const lowerCasedTags = currentPostTags.map(t => t.toLowerCase())
                if (lowerCasedTags.includes(tag.toLowerCase())) {
                    relatedPostIds.push(post.id)
                }
            })

        };
        post.categories.forEach(cat => {
            if (currentPostCategoriesIds.includes(cat.id)) {
                relatedPostIds.push(post.id)
            }
        });

        if ((post.country === currentPost.country) && !!post.country) {
            relatedPostIds.push(post.id)
        }
    });

    return posts.filter((p, i) => relatedPostIds.includes(p.id)).splice(0, 3)
}

export const Replies = ({ comment, setReplyComment }) => {
    return (
        <div>
            {(comment.replies || []).map(reply => {
                 if(!reply.content)return null
                return (
                    <div style={{ marginLeft: 30 }} key={reply.id}>
                        <div style={{ display: 'flex', margin: '20px 0' }}>
                            <div style={{
                                width: 60,
                                borderLeft: '5px solid #cecece', paddingLeft: 5
                            }}>
                                <Avatar
                                    size={60}
                                    md5Email={reply.encryptedEmail}
                                    round={true}
                                />
                            </div>
                            <div style={{ padding: '0 20px' }}>
                                <span style={{ display: 'block', fontSize: '1.6em', fontWeight: 'bold', marginBottom: 10, lineHeight: 1.1 }}>{reply.user}</span>
                                <textarea
                                    defaultValue={reply.content}
                                    readOnly
                                    rows="4"
                                    cols="50"
                                    style={{
                                        fontWeight: 600,
                                        border: 'none',
                                        background: '#efefef',
                                        fontFamily: 'Mulish',
                                        fontSize: '1.1em',
                                        lineHeight: 1.8,
                                    }} />
                            </div>
                        </div>

                        <StyledBlueButton onClick={() => setReplyComment(reply)} icon="image"
                        >
                            Reply
                        </StyledBlueButton>
                        <Replies setReplyComment={setReplyComment} comment={reply} />
                    </div>
                )
            })}
        </div>
    )
}

const Post = ({ winSize }) => {

    const params = useParams();
    const selectedPost = params.postId;

    const postContainer = useRef(null)
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormTouched, setIsFormTouched] = useState(false);

    useEffect(() => {
        setErrors(validateMessage({ name, email, message: comment }));
    }, [name, email, comment]);

    useEffect(() => {
        const Alltrigger = ScrollTrigger.getAll();
        for (let i = 0; i < Alltrigger.length; i++) {
            Alltrigger[i].kill(true)
        }
    }, [])

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleComment = (e) => {
        setComment(e.target.value)
    }
    const submitComment = async () => {

        setIsFormTouched(true);
        const errors = validateMessage({ name, email, message: comment });
        setErrors(errors);
        console.log('errors', errors)
        if (errors.name || errors.email || errors.message) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('post_id', selectedPost);
        formData.append('content', comment);
        formData.append('comment_type', 'post');
        if (replyComment) {
            formData.append('comment_id', replyComment.id)
        }
        await axios.post(`${AppUrl}api/comments/save`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

        const commentsRes = await axios.get(`${AppUrl}api/public-comments/post/${selectedPost}`);
        setComments(commentsRes.data)
        setComment('');
        setName('');
        setEmail('');
        setReplyComment('');
        setIsFormTouched(false);
    }

    const getInitialData = async () => {
        await getPost(selectedPost, setPost, setIsLoading);
        await getPosts(setPosts, setIsLoading);
        await getComments(selectedPost, 'post', setComments, setIsLoading)
    }

    useEffect(() => {
        getInitialData()
        const channel = getPusher().subscribe("my-channel");
        channel.bind("BlogUpdated", async (data) => {
            console.log('data', data)
            await getPost(selectedPost, setPost, setIsLoading);
            await getPosts(setPosts, setIsLoading);
        });
        channel.bind("CommentsUpdated", async (data) => {
            console.log('data', data)
            await getComments(selectedPost, 'post', setComments, setIsLoading);
        });
    }, []);

    const history = useHistory();

    if (isLoading || !post) {
        return (<div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}>
            <Loader color={primaryColor} />
        </div>
        )
    }

    return (
        <Fragment>
            <div style={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden' }}>
                <div style={{
                    zIndex: 1, top: 50, left: '50%', transform: 'translateX(-50%)', position: 'absolute',
                    background: 'rgb(0,0,0,0.6)',
                    borderRadius: 2,
                    padding: 20,
                    minWidth: 300,
                }}><h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: winSize === 1 ? '2em' : '2.5em', fontFamily: "Merriweather", color: 'white' }}>{post.title}</h1></div>
                {!!post.image && <img src={post.image} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', position: 'absolute' }} />}
            </div>

            <div ref={postContainer} style={{ width: '100%', height: '100%', background: '#fff', padding: '40px 20px', maxWidth: 600, margin: 'auto' }}>
                <Button content='Home' onClick={() => { history.push('/') }} />
                <p style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.5em', fontFamily: "Merriweather", color: '#afafaf' }}>{`Posted on ${post.date_written ? new Date(post.date_written).toLocaleDateString() : new Date(post.created_at).toLocaleDateString()} ${!!post.author ? 'by ' + post.author : ''}`}</p>
                <div dangerouslySetInnerHTML={{
                    __html: `<style>
            @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
            img {
                max-width:100%;
                object-fit:cover;
            }
            span {
                max-width:100%;
            }
            </style>` + post.content
                }} />

                {post.is_comments_enabled ? <Fragment>
                    {comments.length > 0 && <p style={{ fontSize: '2.5em', marginTop: 30 }}>{replyComment ? 'Comment' : 'Comments'}</p>}
                    <Form style={{ paddingBottom: 20, fontSize: '1em' }}>
                        {replyComment ?
                            <div style={{ display: 'flex', margin: '20px 0' }}>
                                <div style={{ width: 60 }}>
                                    <Avatar

                                        size={106}
                                        md5Email={replyComment.encryptedEmail}

                                    />
                                </div>
                                <textarea defaultValue={replyComment.content} readOnly rows="3" cols="50" style={{
                                    fontWeight: 600,
                                    border: 'none',
                                    background: '#efefef',
                                    fontFamily: 'Mulish',
                                    fontSize: '1.1em',
                                    lineHeight: 1.8,
                                    marginLeft: 50

                                }} />

                            </div>
                            : <List>
                                {(comments || []).filter(item => item.parent_id === null).map(item => {
                                    console.log('is content content',!!item.content);
                                    if(!item.content)return null
                                    return (<List.Item style={{ marginTop: 20 }} key={item.id}>
                                        <div style={{ display: 'flex', marginBottom: 20 }}>
                                            <div style={{ width: 60 }}>
                                                <Avatar
                                                    size={60}
                                                    md5Email={item.encryptedEmail}
                                                    round={true}
                                                />
                                            </div>
                                            <div style={{ padding: '0 20px' }}>
                                                <span style={{ display: 'block', fontSize: '1.6em', fontWeight: 'bold', marginBottom: 10, lineHeight: 1.1 }}>{item.user}</span>
                                                <textarea
                                                    defaultValue={item.content}
                                                    readOnly rows="4" cols="50" style={{
                                                        fontWeight: 600,
                                                        border: 'none',
                                                        background: '#efefef',
                                                        fontFamily: 'Mulish',
                                                        fontSize: '1.1em',
                                                        lineHeight: 1.8,
                                                    }} />


                                            </div>
                                        </div>

                                        <StyledBlueButton onClick={() => setReplyComment(item)} icon="image"
                                        >
                                            Reply
                                        </StyledBlueButton>
                                        {(item.replies || []).length > 0 && (
                                            <div style={{ marginLeft: 20, marginTop: 10 }}>
                                                <Replies comment={item} setReplyComment={setReplyComment} />
                                            </div>
                                        )}
                                    </List.Item>)
                                })}
                            </List>}


                        <div>
                            <label style={{ fontSize: '2em', display: 'block', margin: '40px 0 30px 0' }}>{replyComment.content ? `Reply to ${replyComment.user}` : 'Leave a Comment'}</label>
                            <TextArea value={comment} onChange={handleComment} placeholder='Comment' style={{ minHeight: 100, width: '100%' }} />
                            {!!isFormTouched && <StyledInputError>{errors.message}</StyledInputError>}
                            <div style={{ marginTop: 20 }}>
                                <label style={{ fontSize: '1.2em' }}>Full Name</label>
                                <StyledFormTextInput value={name} onChange={handleName} placeholder='Full Name' />
                                {!!isFormTouched && <StyledInputError>{errors.name}</StyledInputError>}
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <label style={{ fontSize: '1.2em' }}>E-mail</label>
                                <StyledFormTextInput value={email} onChange={handleEmail} placeholder='E-mail' />
                                {!!isFormTouched && <StyledInputError>{errors.email}</StyledInputError>}
                            </div>
                        </div>
                        <div style={{ margin: '40px 0' }}>
                            <StyledBlueButton onClick={submitComment} icon="image"
                            >
                                Submit
                            </StyledBlueButton>
                            {replyComment.content && (
                                <StyledRedButton onClick={() => setReplyComment('')} icon="image"
                                >
                                    Cancel Reply
                                </StyledRedButton>
                            )}
                        </div>
                    </Form>
                </Fragment> : <div><h1>Comments Disabled</h1></div>}
            </div>
            {(getRelatedPosts(post, posts).length > 1) && <h1 style={{ textAlign: 'center' }}>Related Posts</h1>}
            <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: winSize === 1 ? 'column' : 'row' }}>

                {getRelatedPosts(post, posts).map(p => (
                    <div key={p.title + p.created_at} style={{ width: '100%', height: '100%', background: '#fff', maxWidth: 400 }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            padding: 10,
                            height: 400,
                            width: '100%',
                        }}>
                            <div style={{ position: 'relative', height: 200, width: '100%' }}>
                                <img onClick={() => history.push(`/post/${p.id}`)} src={p.image} style={{ objectFit: 'cover', width: '100%', height: 200, cursor: 'pointer' }} />
                            </div>
                            <div>
                                <p onClick={() => history.push(`/post/${p.id}`)} style={{ fontSize: '1.5em', textAlign: 'center', fontFamily: 'Mulish', fontWeight: 'bold', margin: 0, cursor: 'pointer' }}>
                                    {p.title}
                                </p>
                                <p style={{ fontStyle: 'italic', color: '#8b8b8b', padding: 10, textAlign: 'center' }}>
                                    {!!p.date_written ? moment(new Date(p.date_written).getTime()).format("MMMM DD YYYY") : moment(new Date(p.created_at).getTime()).format("MMMM DD YYYY")}
                                </p>
                            </div>

                            <p style={{ textAlign: 'center' }}>{p.description}</p>

                            <div />
                        </div>
                    </div>
                ))}




                {/* <div style={{ width: '100%', height: 300, background: 'green' }}>

                </div>
                <div style={{ width: '100%', height: 300, background: 'blue' }}>

                </div> */}
            </div>
        </Fragment>)
}

export default Post;