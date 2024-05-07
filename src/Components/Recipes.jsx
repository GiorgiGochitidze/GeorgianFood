import "./CSS/recipes.css";
import { motion } from "framer-motion";
import { FaRegBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : undefined;

const Recipes = ({ headingName }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/loadPosts")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log("server error: ", err);
      });
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios
        .post("http://localhost:5000/deletePost", {
          postId: postId,
        })
        .then((response) => {
          console.log("post removed succesfully", response.data);

          const updatedRecipes = recipes.filter(
            (recipe) => recipe._id !== postId
          );
          setRecipes(updatedRecipes);
        });
    } catch (err) {
      console.log("smth went wrong ", err);
    }
  };

  return (
    <div className="recipes-container">
      <h1>{headingName}</h1>

      {recipes.length > 0 ? (
        <div className="recipes-list">
          {recipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              initial={{ height: "320px" }}
              whileHover={{ height: "auto" }}
              className="recipes-card"
            >
              <img src={recipe.img} alt={recipe.title} />

              <h1 style={{ marginTop: "10px" }}>{recipe.title}</h1>

              <p>{recipe.description}</p>

              <button className="bookmark-btn">
                <FaRegBookmark />
              </button>

              {decoded.userType === "admin" ? (
                <button
                  className="del-btn"
                  onClick={() => handleDeletePost(recipe._id)}
                >
                  X
                </button>
              ) : (
                ""
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        "რეცეპტები ვერ მოიძებნა გთხოვთ დაელოდოთ ან დაამატოთ საკუთარი რეცეპტები"
      )}
    </div>
  );
};

export default Recipes;
