import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
const { REACT_APP_SERVER_URL } = process.env;
import UserModel from "../models/user";
import axios from "axios";

const UpdatePhotoModal = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState("");
  const { handleLogout, user } = props;
  const { id, exp } = user;
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();

  useEffect(() => {
    // let token;
    // if (!localStorage.getItem('jwtToken')) {
    //   setIsAuthenticated(false);
    //   console.log('====> Authenticated is now FALSE');
    // } else {
    //   token = jwt_decode(localStorage.getItem('jwtToken'));
    //   setAuthToken(localStorage.getItem('jwtToken'));
    //   setCurrentUser(token);
    // }
  }, []);

  // const updateUser = async (userPhoto, userId) => {
  //     function isUpdatedUser(user) {
  //         return currentUser.id === userId;
  //     }
  //     const result = await UserModel.update(userId, userPhoto)
  //     let usersCurrent = currentUser
  //     usersCurrent.photo= userPhoto
  //     setCurrentUser(usersCurrent)
  //     }
  // }

  // const handleSubmit = (e)=> {
  //     e.preventDefault()
  //     console.log('submit')
  //     let form_data = new FormData();
  //     form_data.append('image', photoo, 'image');
  //     axios.post(`${REACT_APP_SERVER_URL}/images`, form_data, {
  //         headers: {
  //         'content-type': 'multipart/form-data'
  //         }
  //     })
  //         .then(res => {
  //         console.log(res.data);
  //         setUrl(res.data.url)
  //         toggleBodyForm()

  //         updateUser({photo: res.data.url}, currentUser.id)
  //         })
  //         .catch(err => console.log(err))
  //     };

  //     const getPhoto = async() => {
  //         let newPhoto = ''
  //         const result = await UserModel.oneUser(id)
  //         newPhoto= result.data.photo
  //         setPhoto(newPhoto)
  //         console.log(newPhoto)
  //     }

  //    if (currentTime >= expirationTime) {
  //        handleLogout();
  //        alert('Session has ended. Please login to continue.');
  //    } else {
  //         getPhoto()
  //    }

  return (
    <div className="pic-section">
      {/* 
            {photo ? <img className="profile-pic" src={photo} /> : <img className="profile-pic" src="https://res.cloudinary.com/ddmbb2ian/image/upload/v1615672962/qvo_UWEYzvsVDmwUPEWLsCIh_xjgub8.jpg" />}

            <p>Change your profile picture</p>
            <form className="picture-change" onSubmit={handleSubmit}>
                <input type='file' onChange={(event) => {
                    setPhotoo(event.target.files[0])
                }} />
                <button className='upload-button' type='submit'>Upload</button>
            </form>
 */}
    </div>
  );
};

export default UpdatePhotoModal;
