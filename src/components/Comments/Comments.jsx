import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { AppUrl, validateMessage } from '../../pages/utility';
import { StyledBlueButton, StyledRedButton, StyledFormTextInput, StyledInputError } from '../../pages/StyledComponents';
import { Form, TextArea, List } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import { Replies } from '../../pages/Posts/Post';

const Comments = ({ doc, docId, isVideo, comments, setComments }) => {

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');

    const [replyComment, setReplyComment] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormTouched, setIsFormTouched] = useState(false);

    useEffect(() => {
        setErrors(validateMessage({ name, email, message: comment }));
    }, [name, email, comment])

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
        if (errors.name || errors.email || errors.message) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append(isVideo ? 'video_id' : 'post_id', docId);
        formData.append('content', comment);
        formData.append('comment_type', isVideo ? 'video' : 'post');
        if (replyComment) {
            formData.append('comment_id', replyComment.id)
        }
        await axios.post(`${AppUrl}api/comments/save`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

        const commentsRes = await axios.get(`${AppUrl}api/public-comments/post/${docId}`);
        setComments(commentsRes.data)
        setComment('');
        setName('');
        setEmail('');
        setReplyComment('');
        setIsFormTouched(false);
    }


    return (
        <div style={{ background: '#fff', padding: 10, maxWidth: 800, margin: 'auto' }}>
            {doc.is_comments_enabled ? <Fragment>
                {comments.length > 0 && <p style={{ fontSize: '2.5em', marginTop: 30, textAlign: 'center' }}>{replyComment ? 'Comment' : 'Comments'}</p>}
                <Form style={{ paddingBottom: 20, fontSize: '1em' }}>
                    {replyComment ?
                        <div style={{ display: 'flex', margin: '20px 0' }}>
                            <div style={{ width: 60 }}>
                                <Avatar
                                    size={100}
                                    md5Email={replyComment.encryptedEmail}

                                />
                            </div>
                            <textarea readOnly rows="3" cols="50" style={{
                                fontWeight: 600,
                                border: 'none',
                                background: '#efefef',
                                fontFamily: 'Mulish',
                                fontSize: '1.1em',
                                lineHeight: 1.8,
                                marginLeft: 20

                            }}>
                                {replyComment.content}
                            </textarea>
                        </div>
                        : <List>
                            {(comments || []).filter(item => item.parent_id === null).map(item => {
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
                                            <textarea readOnly rows="4" cols="50" style={{
                                                fontWeight: 600,
                                                border: 'none',
                                                background: '#efefef',
                                                fontFamily: 'Mulish',
                                                fontSize: '1.1em',
                                                lineHeight: 1.8,
                                            }}>
                                                {item.content}
                                            </textarea>
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

    )
}

export default Comments