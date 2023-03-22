import React from "react";
import { useEffect, useState } from "react";
import UserModel from "../models/user";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

const EditForm = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [aboutme, setAboutme] = useState("");

  useEffect(() => {
    let token;

    if (!localStorage.getItem("jwtToken")) {
      setIsAuthenticated(false);
      console.log("====> Authenticated is now FALSE");
    } else {
      token = jwt_decode(localStorage.getItem("jwtToken"));
      setAuthToken(localStorage.getItem("jwtToken"));
      setCurrentUser(token);
    }
  }, []);

  const onInputChange = (event) => {
    setAboutme(event.target.value);
  };
  const updateUser = async (userAbout, userId) => {
    function isUpdatedUser(user) {
      return currentUser.id === userId;
    }
    const result = await UserModel.update(userId, userAbout);
    let usersCurrent = currentUser;
    usersCurrent.about = userAbout.about;
    setCurrentUser(usersCurrent);
  };

  const [formStyle, setFormStyle] = useState({ display: "none" });
  const [bodyStyle, setBodyStyle] = useState({});
  const toggleBodyForm = () => {
    if (formStyle.display === "block") {
      setFormStyle({ display: "none" });
      setBodyStyle({ display: "block" });
    } else {
      setFormStyle({ display: "block" });
      setBodyStyle({ display: "none" });
    }
  };

  const onFormSubmit = async (event) => {
    // event.preventDefault()
    toggleBodyForm();
    console.log(aboutme);
    updateUser({ about: aboutme }, currentUser.id);
  };

  return (
    <div>
      <form className="about-form" onSubmit={onFormSubmit}>
        <textarea
          onChange={onInputChange}
          className="user-about-text-area"
          rows="5"
          cols="100"
          value={aboutme}
          placeholder="Tell us about yourself"
        ></textarea>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
