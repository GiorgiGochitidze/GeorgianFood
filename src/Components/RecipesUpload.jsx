import React, { useState } from "react";
import "./CSS/recipesupload.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipesUpload = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const dateNow = Date.now();

  const handleUploadRecipe = () => {

    if(!image || !description || ! title){
        console.log('გთხოვთ შეავსოთ ყველა ველი')
        setMessage('გთხოვთ შეავსოთ ყველა ველი')
        setTimeout(() => {
            setMessage(false)
        }, 1300)
        return
    }

    const formData = new FormData();
    formData.append("image", image); // Assuming image is the file
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", dateNow);

    axios
      .post("http://localhost:5000/uploadPosts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Post uploaded successfully", response.data);

        setMessage('რეცეპტი დაემატა წარმატებულად')

        setTimeout(() => {

            navigate('/')
            
            window.location.reload()
        }, 1500)
      })
      .catch((err) => {
        console.log("Internal Server Error", err);
      });
  };

  return (
    <div className="upload-container">
      <div className="image-container">
        <input
          type="file"
          name="file"
          id="file"
          onChange={previewImage} // Changed this line
          style={{ display: "none" }}
        />
        {image && (
          <img
            className="choosen-img"
            src={URL.createObjectURL(image)}
            alt={image.name}
            style={{ display: "block", width: "300px" }}
          />
        )}
        <label htmlFor="file" className="upload-button">
          სურათის ატვირთვა
        </label>
        {!image && <h3 style={{textAlign: 'center'}}>გთხოვთ შეარჩიოთ ჰორიზონტალური <br /> სახის სურათი</h3>}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="კერძის სახელი"
        />
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="კერძის აღწერა"
        ></textarea>

        {message && <p>{message}</p>}

        <button onClick={handleUploadRecipe} className="recipe-btn">
          კერძის დამატება
        </button>
      </div>
    </div>
  );
};

export default RecipesUpload;
