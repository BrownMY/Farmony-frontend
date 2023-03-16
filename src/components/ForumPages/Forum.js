import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from 'react-router-dom'

import NewPostModal from '../NewPostModal';

import './styles/forum.styles.css'

const Forum = (props) => {

    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [posts, setPosts] = useState([])
    const [isNewPostMode, setIsNewPostMode] = useState(false)
    //Why is this causing a rerender loop when trying to set in state?
    let style = { backgroundColor: 'white' }


    useEffect(() => {
        setTitle(props.title)
        setDescription(props.description)
        setPosts(props.posts)
    }, [props.posts]);

    const handleNewPostMode = () => {
        console.log(isNewPostMode)
        setIsNewPostMode(true)
    }

    const listOfPosts = props.posts.map((post) => {
        // clean this up. Exchange this for tailwind?
        if (post.postType === 'Sharing') {
            style = { border: '2px solid green', color: 'green' }
        } else if (post.postType === 'Seeking'){
            style = { border: '2px solid orange', color: 'orange' }
        }
        return (
            <Link to={{
                pathname: `/post/${post._id}`
            }}>
            <div key={post._id} className="post-item-container">
                <div className="post-header">
                    <img className="post-header-photo" src={post.photo ? `post.photo` : `https://res.cloudinary.com/ddmbb2ian/image/upload/v1615672962/qvo_UWEYzvsVDmwUPEWLsCIh_xjgub8.jpg`} alt="Poster"></img>
                        <p className="poster-name">{post.name} posted</p>
                        <div className="post-stamp"><Moment fromNow>{post.date}</Moment></div>
                <h4 style={post.postType ? style : { display: 'none' }} className="post-type">{post.postType}</h4>
                </div>
                <h3 className="post-title">{post.title} </h3>
                <p className="post-content">{post.content}</p>
                <div className='post-footer'>{post.comment.length} Comments</div>
            </div>
                </Link>
        )
    });

    return (
        <div className='forum-container'>
            <h1 className="forum-title">{title}</h1>
            <p className="forum-description">{description}</p>
            <div className="posts-container">
                <NewPostModal isOpen={isNewPostMode} user={props.user} category={props.title} />
                <div className="posts-scroll-container">
                    <button className='new-post-button' onClick={handleNewPostMode}>New Post</button>
                    {listOfPosts}
                </div>


            </div>
        </div>

    );
}

export default Forum;