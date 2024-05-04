import "./CSS/home.css";
import Recipes from "./Recipes";
import Welcome from "./Welcome";
import WhyUs from "./WhyUs";

const Home = () => {
  return (
    <main>
        <Welcome />

        <WhyUs />

        <Recipes headingName={"უახლესი რეცეპტები"} />
    </main>
  );
};

export default Home;
