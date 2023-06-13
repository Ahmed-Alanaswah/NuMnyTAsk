import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userServices } from "../services/user.services";
import { getQueryParam } from "../helpers/helpers";
import Button from "../components/Button";
import styles from "../styles/editPage.module.css";

const UploadImage = () => {
  const userId = getQueryParam("userId");

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      await userServices.upload(userId, formData);

      navigate(`/users/${userId}`);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.upload}>
      <div>
        <h4>Image</h4>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default UploadImage;
