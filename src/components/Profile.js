import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserModel from '../models/user'
// const cloudinary = require('cloudinary')
// const multer = require('multer')
// import multer from 'multer'
// import cloudinary from 'cloudinary';
// const uploads = multer({dest:"../uploads"})
import EditForm from './EditForm'

const Profile = (props) => {
   const { handleLogout, user } = props;
   const { id, name, email,exp} = user;
   const expirationTime = new Date(exp * 1000);
   let currentTime = Date.now();

    const [ about, setAbout] = useState('')
    const getAbout = async() =>{
        let newAbout = ''
        const result = await UserModel.oneUser(id)
        newAbout= result.data.about
        setAbout(newAbout)
        console.log(newAbout)
    }
   

   // make a condition that compares exp and current time
   if (currentTime >= expirationTime) {
       handleLogout();
       alert('Session has ended. Please login to continue.');
   } else {
        getAbout()
   }
 
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')
    const uploadImage = async (e)=>{
        e.preventDefault()
        // let uploadResult = await uploads.single(e.target.file)
        // console.log(uploadResult)
        const files = e.target.files
        // cloudinary.uploader.upload
        const data = new FormData()
        data.append('inputfile', files)
        console.log(files)
        // data.append('upload_preset', 'geekyimage')
        // setLoading(true)
        // const res = await fetch(
        //     'https://',
        //     {
        //         method: 'POST',
        //         body: data
        //     }
        // )
        // const file = await res.json()
        // console.log(file)

        // setImage(file.secure_url)
        // setLoading(false)
    }

   const userData = user ?
   (<div>
       <h1>Profile</h1>
       <p>[Image placeholder]</p>
       <div className="App">
          <form encType="multipart/form-data" onSubmit={uploadImage}>
            <input type= "file" name="inputfile" placeholder="upload an image" onChange={uploadImage} />
            {loading ? (
                <h3>Loading...</h3>
            ):(
                <img src={image} style={{width: '300px'}}/>
            )}
            <button type= "submit">submit</button>
          </form>
        </div>
       <p>Name: {name}</p>
       <p>Email: {email}</p>
       <p>ID: {id}</p>
       <p>About Me: {about}</p>
       
   </div>) : <h2>Loading...</h2>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div className="text-center pt-4">
            {user ? userData : errorDiv()}
            <EditForm />
           
        </div>
    );

}

export default Profile;