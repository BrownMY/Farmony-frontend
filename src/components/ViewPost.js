import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'

import Comments from './Comments';
import PostModel from '../models/post'
import PostComment from './PostComment';

const ViewPost = (props) => {
    const location = useLocation()

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
    const [name, setName] = useState("")

    const setData = async () => {
        let postId = props.match.params.id
        let response = await PostModel.show(postId)
        
        setPost(response.data)
        setComments(response.data.comment)     
    }

    useEffect(async() => {
        await setData()
    }, []);

    return (
        <div>
        <Link to='/holistichub'>&larr;Back holistic Community Board</Link>
        <div className="view-post">
            <h3>Post Title: {post.title}</h3>
            <h5 className="no-margin">By: {post.name}</h5>
        
        <p className="post-content">{post.content}</p>
        <div>
            <Comments comments={comments} />
        </div>
        <PostComment post={post} comments={comments} />
        </div>
    </div>
    );
}
export default ViewPost;

