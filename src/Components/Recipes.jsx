import "./CSS/recipes.css";
import recipesBackground from "../assets/recipesBackground.png";
import { motion } from "framer-motion";
import { FaRegBookmark } from "react-icons/fa";

const Recipes = ({ headingName }) => {
  return (
    <div className="recipes-container">
      <h1>{headingName}</h1>

      <div className="recipes-list">
        <motion.div
          initial={{ height: "355px" }}
          whileHover={{ height: "auto" }}
          className="recipes-card"
        >
          <img src={recipesBackground} alt="recipes background image" />

          <h1 style={{ marginTop: "10px" }}>ხინკალი</h1>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis unde
            accusantium rerum eius. Nostrum officiis praesentium labore officia
            tenetur quae, rerum reiciendis tempora hic neque, reprehenderit
            laboriosam quaerat, possimus consequatur? Laborum officiis
            reprehenderit autem quidem omnis! Voluptatum nesciunt, aperiam
            aliquid vero porro, pariatur qui eveniet ullam magni quasi non
            maxime beatae mollitia saepe nemo accusantium molestias amet quam
            minus perferendis.
          </p>

          <button className="bookmark-btn">
            <FaRegBookmark />
          </button>
        </motion.div>

        <motion.div
          initial={{ height: "350px" }}
          whileHover={{ height: "auto" }}
          className="recipes-card"
        >
          <img src={recipesBackground} alt="recipes background image" />

          <h1 style={{ marginTop: "10px" }}>ხინკალი</h1>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis unde
            accusantium rerum eius. Nostrum officiis praesentium labore officia
            tenetur quae, rerum reiciendis tempora hic neque, reprehenderit
            laboriosam quaerat, possimus consequatur? Laborum officiis
            reprehenderit autem quidem omnis! Voluptatum nesciunt, aperiam
            aliquid vero porro, pariatur qui eveniet ullam magni quasi non
            maxime beatae mollitia saepe nemo accusantium molestias amet quam
            minus perferendis.
          </p>

          <button className="bookmark-btn">
            <FaRegBookmark />
          </button>
        </motion.div>

        <motion.div
          initial={{ height: "350px" }}
          whileHover={{ height: "auto" }}
          className="recipes-card"
        >
          <img src={recipesBackground} alt="recipes background image" />

          <h1 style={{ marginTop: "10px" }}>ხინკალი</h1>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis unde
            accusantium rerum eius. Nostrum officiis praesentium labore officia
            tenetur quae, rerum reiciendis tempora hic neque, reprehenderit
            laboriosam quaerat, possimus consequatur? Laborum officiis
            reprehenderit autem quidem omnis! Voluptatum nesciunt, aperiam
            aliquid vero porro, pariatur qui eveniet ullam magni quasi non
            maxime beatae mollitia saepe nemo accusantium molestias amet quam
            minus perferendis.
          </p>

          <button className="bookmark-btn">
            <FaRegBookmark />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Recipes;
