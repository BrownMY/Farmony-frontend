import React, { useState, useEffect } from 'react'

import CloseIcon from '@mui/icons-material/Close';

function Modal(props) {
    const [category, setCategory] = useState('Select')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [postType, setPostType] = useState('Select')
    const [categoryPostType, setCategoryPostType] = useState({ display: 'none' })
    const [currentUser, setCurrentUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(props.isVisible)
    }, [props.isVisible]);
    
    const handleClose = () => {
        setIsVisible(false)
        console.log(`++ CLOSE MODAL ++`)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleBody = (e) => {
        setBody(e.target.value)
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
        if (e.target.value === 'Buy' || e.target.value === 'Volunteer') {
            setCategoryPostType({ display: 'block' })
        } else {
            setCategoryPostType({ display: 'none' })
        }
    }
    const handlePostType = (e) => {
        setPostType(e.target.value)
    }
    const onFormSubmit = (e) => {
        
        if (category === 'Holistic Hub') {
            HolisticModel.create({
                title,
                name: currentUser.name,
                photo: currentUser.photo,
                farmer: currentUser.farmer,
                content: body,
                category,
            })
        } else if (category === 'Volunteer') {
            VolunteerModel.create({
                title,
                name: currentUser.name,
                photo: currentUser.photo,
                farmer: currentUser.farmer,
                content: body,
                postType,
                category,
            })
        } else if (category === 'Buy') {
            BuyModel.create({
                title,
                name: currentUser.name,
                photo: currentUser.photo,
                farmer: currentUser.farmer,
                content: body,
                postType,
                category,
            })
        }
        if (postType === 'Select') {
            e.preventDefault()
            alert('Please choose an option')
        }

            setIsVisible(false)
    }

  return (
    <div className={ isVisible ? 'modal-class' : 'no-display'}>
    
    <div className="makeNewPost bg-red-600">
        <div className='title-div'>
            <h1 className="post-title">Post a new thread</h1>
            <button onClick={handleClose} className='flex self-center bg-red-400 '><CloseIcon /></button>
        </div>
            <form className="post-form" onSubmit={onFormSubmit}>
                <label>
                    <p>Post as { currentUser.name }</p>
                    <p>Post Title: </p>
                    <input type="text" name="postTitle" value={title} onChange={handleTitle}></input>
                </label><br />
                <label>
                    <textarea type="text" rows='5' cols='80' name="body" value={body} onChange={handleBody}></textarea>
                </label><br />
                <label>
                    <p>Category: </p>
                    <select value={category} onChange={handleCategory}>
                        <option value="Select">Select</option>
                        <option value="Buy">Buy</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Holistic Hub">Holistic Hub</option>
                    </select>
                    <div className="category-post-type" style={categoryPostType}>
                        Post Type:
                    <select value={postType} onChange={handlePostType}>
                            <option value="Select">Select</option>
                            <option value="Seeking">Seeking</option>
                            <option value="Sharing">Sharing</option>
                        </select>
                    </div>

                    <input className="new-post-submit" type="submit" value="Submit"></input>
                </label>
            </form>        
        </div>

    </div>
)};

export default Modal;