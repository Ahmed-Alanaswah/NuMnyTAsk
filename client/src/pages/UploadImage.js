import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userServices } from "../services/user.services";
import axios from "axios";

const UploadImage = () => {
  const userId = new URLSearchParams(document.location.search).get("userId");

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  console.log(userId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      console.log("formData", formData);
      await userServices.upload(userId, formData);

      navigate(`/users/${userId}`);
      // Image uploaded successfully
      console.log("Image uploaded!");
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadImage;
