import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import NewPostModal from '../NewPostModal';
// import NewPost from '../NewPost'

import './styles/forum.styles.css'

const Forum = (props) => {

    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [posts, setPosts] = useState([])
    const [isNewPostMode, setIsNewPostMode] = useState(false)
    let style = { backgroundColor: 'white' }


    useEffect(() => {
        setTitle(props.title)
        setDescription(props.description)
        setPosts(props.posts)
        console.log(props.posts) 
    }, [props.posts]);

    const handleNewPostMode = () => {
        setIsNewPostMode(true)
    }

    const listOfPosts = props.posts.map((post) => {
    // clean this up. Exchange this for tailwind?
        if ( post.postType === 'Sharing') {
            style = { border: '2px solid green', color: 'green' }
        } else {
            style = { border: '2px solid orange', color: 'orange' }
        }
        return (
            <div key={ post._id } className="post-div">
               <div className="poster-info">
                 <img className="poster-photo" src={ post.photo ? `post.photo` : `https://res.cloudinary.com/ddmbb2ian/image/upload/v1615672962/qvo_UWEYzvsVDmwUPEWLsCIh_xjgub8.jpg`} alt="Poster"></img>
                <p className="poster-name">{ post.name }</p>
                <h4 className="post-stamp"> <br /> { post.date.slice(0, 10) }  <br /> { post.date.slice(11, 16) }</h4>
             </div>
                <h4 style={ post.postType ? style : { display: 'none' }} className="post-type">{ post.postType }</h4>
                <h3 className='post-title'>{ post.title } </h3>
                <button className="view-post-button">
                    <Link to={{ 
                        pathname:`/post/${post._id}`
                        }}>
                        View Post
                    </Link>
                </button>
            </div>
        )
    });

    return (
        <div className='forum-container'>
            <h1 className="forum-title">{ title }</h1>
            <h4 className="forum-description">{ description }</h4>
            <div className="posts-container">
                <NewPostModal isOpen={isNewPostMode} user={props.user} category={props.title}/>
                {/* <NewPost /> */}
                <div className="posts-scroll-container">
            <button className='new-post-button' onClick={handleNewPostMode}>New Post</button>
                    {listOfPosts}
                </div>


            </div>
        </div>

    );
}

export default Forum;