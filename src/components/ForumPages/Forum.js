import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'

import Modal from '../Modal';
import NewPost from '../NewPost'


const Forum = (props) => {

    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [posts, setPosts] = useState([])
    let style = { backgroundColor: 'white' }


    useEffect(() => {
      
        setTitle(props.title)
        setDescription(props.description)
        setPosts(props.posts)
      
    }, []);

    const listOfPosts = props.posts.map((post) => {
    // clean this up. Exchange this for tailwind?
        if (post.postType === 'Sharing') {
            style = { border: '2px solid green', color: 'green' }
        } else {
            style = { border: '2px solid orange', color: 'orange' }
        }
        return (
            <div key={post._id} className="postDiv">
               <div className="poster-info">
                 <img className="poster-photo" src="{post.photo}" alt="Poster"></img>
                <p className="post-stamp">{post.name}</p>
             </div>
                <h4 style={ post.postType ? style : {display: 'none'}} className="post-type">{post.postType}</h4>
                <h3>{post.title} </h3>
                <h4 className="post-stamp"> <br /> {post.date.slice(0, 10)}  <br /> {post.date.slice(11, 16)}</h4>
                <button className="communityButton">
                    <Link to={{ 
                        pathname:`/post/${post._id}`,
                        state: {
                            post: post
                        }
                        }}>
                        View Post
                    </Link>
                </button>
            </div>
        )
    })

    return (
        <div>
            <h1 className="board-title">{ title }</h1>
            <h4 className="boardDescrip">{ description }</h4>
            <div className="postContainer">
                <NewPost />
                <div className="postScroll">
                    {listOfPosts}
                </div>


            </div>
        </div>

    );
}

export default Forum;