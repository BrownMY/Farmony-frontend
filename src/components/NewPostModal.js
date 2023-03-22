import React, { useState, useEffect } from "react";

import BuyModel from "../models/buy";
import HolisticModel from "../models/holistic";
import VolunteerModel from "../models/volunteer";

import CloseIcon from "@mui/icons-material/Close";

import "./modals/styles/new-post-modal.styles.css";

function NewPostModal({ isOpen, user, category }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postType, setPostType] = useState("Select");
  const [categoryPostType, setCategoryPostType] = useState({ display: "none" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen, user]);

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handlePostType = (e) => {
    setPostType(e.target.value);
  };
  const onFormSubmit = (e) => {
    //pass down category in props. do not use drop dowm

    if (category === "Holistic Hub") {
      HolisticModel.create({
        title,
        name: user.name,
        photo: user.photo,
        farmer: user.farmer,
        content: body,
        category,
      });
    } else if (category === "Volunteer") {
      VolunteerModel.create({
        title,
        name: user.name,
        photo: user.photo,
        farmer: user.farmer,
        content: body,
        postType,
        category,
      });
    } else if (category === "Buy") {
      BuyModel.create({
        title,
        name: user.name,
        photo: user.photo,
        farmer: user.farmer,
        content: body,
        postType,
        category,
      });
    }
    if (postType === "Select") {
      e.preventDefault();
      alert("Please choose an option");
    }

    setIsVisible(false);
  };

  return (
    <div className={isVisible ? "new-post-modal-class" : "no-display"}>
      <div className="new-post-modal-container">
        <div className="title-div">
          <h2 className="new-post-title">Post a new thread</h2>
          <button onClick={closeModal} className="new-post-modal-close">
            <CloseIcon />
          </button>
        </div>
        <form className="post-form">
          <label>
            <p>Posting as {user.name}</p>
            <p>Post Title: </p>
            <input
              type="text"
              name="postTitle"
              value={title}
              onChange={handleTitle}
              className="new-post-modal-title"
            ></input>
          </label>
          <br />
          <label>
            <textarea
              type="text"
              rows="5"
              cols="80"
              name="body"
              value={body}
              onChange={handleBody}
              className="new-post-modal-body"
            ></textarea>
          </label>
          <br />
          <label>
            <p>Posting in {category} </p>
            <div
              className="category-post-type"
              style={
                category === "Holistic Hub"
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              Post Type:
              <select value={postType} onChange={handlePostType}>
                <option value="Select">Select</option>
                <option value="Seeking">Seeking</option>
                <option value="Sharing">Sharing</option>
              </select>
            </div>

            <input
              onClick={onFormSubmit}
              className="new-post-submit"
              type="submit"
              value="Submit"
            ></input>
          </label>
        </form>
      </div>
    </div>
  );
}

export default NewPostModal;
