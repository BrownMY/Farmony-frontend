import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserModel from '../../models/user'
import EditForm from '../EditForm'
import UpdatePhotoModal from '../UpdatePhotoModal'

import './styles/profile.styles.css'

const Profile = (props) => {
    const { handleLogout, user } = props;
    const { id, name, email, farmer, exp } = user;
    const [about, setAbout] = useState('')
    const [photo, setPhoto] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();

    useEffect(() => {
        console.log(props)
    }, []);

    const getAbout = async () => {
        let newAbout = ''
        const result = await UserModel.oneUser(id)
        newAbout = result.data.about
        setAbout(newAbout)
    }
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
    } else {
        getAbout()
    }
    const userData = user ?
        (<div className="user-data">
            <div className="user-name-data">
                <p>Name | {name}</p>

                {farmer ? <img className="badge-pic" src="https://i.imgur.com/G9tBFn9.png" alt="farmer-badge" /> : ""}
            </div>
            <p>Email | {email}</p>


        </div>) : <h2>Loading...</h2>
    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };

    const handlePhotoModal = () => {
        isVisible ? isVisible : setIsVisible(true)
    }

    const closeModal = () => {
        setIsVisible(false)
    }

    return (
        <div >
            <div className="profile-container">
                <div className={isVisible ? "modal-class" : "no-display"}>
                    <UpdatePhotoModal user={user} isVisible={isVisible} />
                </div>
                <h4 className="welcome-user">Welcome {name}!</h4>
                <div className='user-data-container'>
                    <div className="profile-left-section">
                        <div className='icon-section'>
                            {photo ? <img className="profile-pic" src={photo} /> : <img className="profile-pic" src="https://res.cloudinary.com/ddmbb2ian/image/upload/v1615672962/qvo_UWEYzvsVDmwUPEWLsCIh_xjgub8.jpg" />}
                            <button onClick={handlePhotoModal} className="update-photo">Update Profile Photo</button>
                        </div>
                            {user ? userData : errorDiv()}
                    </div>
                    <div className="profile-right-section">
                        <div>
                            <h4 className="about-me-heading">About {name}</h4>
                            <p className="about-content">{about}</p>
                        <EditForm />
                        </div>
                    </div>
                </div>
                <Link to={`/previewprofile/${user.id}`} className="preview-profile">Profile Preview</Link>
            </div>

        </div>
    );
}
export default Profile;
