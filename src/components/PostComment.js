import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import PostModel from '../models/post'


const PostComment = (props) => {

    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState([])
    const [currentUser, setCurrentUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const setData = () => {
        let token;

        if (!localStorage.getItem('jwtToken')) {
            setIsAuthenticated(false);
        } else {
            token = jwt_decode(localStorage.getItem('jwtToken'));
            setAuthToken(localStorage.getItem('jwtToken'));
            setCurrentUser(token);
        }
        setPostId(props.post._id)
        setComments(props.comments)
    }

    useEffect(async () => {
        await setData()
    }, [props.comments]);

    const handleContent = async (e) => {
        await setContent(e.target.value)
    }

    const updatePost = async (postId, updatedComments) => {
        await PostModel.update(postId, updatedComments)
    }

    const onFormSubmit = async (e) => {
        const newComment = {
            name: currentUser.name,
            photo: currentUser.photo,
            content: content,
            date: Date()
        }

        comments.push(newComment)
        await updatePost(props.post._id, { comment: comments })
    }

    return (
        <div>
            <p>Post as: {currentUser.name}</p>
            <form onSubmit={onFormSubmit}>
                <label>
                    Add Comment:
                    <input type="text" name="comment" value={content} onChange={handleContent}></input>
                </label><br />
                <input type="submit" value="Post"></input>
            </form>
        </div>
    );
}

export default PostComment;
