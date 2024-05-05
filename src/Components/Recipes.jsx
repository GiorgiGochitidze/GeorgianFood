import "./CSS/recipes.css";
import recipesBackground from "../assets/recipesBackground.png";
import { motion } from "framer-motion";
import { FaRegBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const Recipes = ({ headingName }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/loadPosts").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  console.log(recipes);

  return (
    <div className="recipes-container">
      <h1>{headingName}</h1>

      <div className="recipes-list">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe._id}
            initial={{ height: "355px" }}
            whileHover={{ height: "auto" }}
            className="recipes-card"
          >
            <img src={recipesBackground} alt="recipes background image" />

            <h1 style={{ marginTop: "10px" }}>{recipe.heading}</h1>

            <p>{recipe.body}</p>

            <button className="bookmark-btn">
              <FaRegBookmark />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
