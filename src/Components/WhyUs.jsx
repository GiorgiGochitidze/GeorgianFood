import "./CSS/whyus.css";
import fruitInBlender from "../assets/fruitSmoothieInBlender.png";
import orderingCart from "../assets/orderingCart.png";
import tacoWithChili from "../assets/tacoWithChili.png";

const WhyUs = () => {
  return (
    <div className="whyus-container">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>რატომ ჩვენ?</h1>

      <div className="reasons-container">
        <div className="reasons-card">
          <img
            style={{ background: "#FF725E" }}
            src={fruitInBlender}
            alt="fruit in blender"
          />

          <h1>მარტივი</h1>

          <p>მარტივი საძიებო სისტემა და სტატიების დამატება</p>
        </div>

        <div className="reasons-card">
          <img
            style={{ background: "#FFDC5E" }}
            src={orderingCart}
            alt="ordering cart"
          />

          <h1>მრაველფეროვანი</h1>

          <p>წარმოდგენილია უამრავი რეცეპტების არჩევანი</p>
        </div>

        <div className="reasons-card">
          <img
            style={{ background: "#FFB55E" }}
            src={tacoWithChili}
            alt="ordering cart"
          />

          <h1>საინტერესო</h1>

          <p>რეცეპტების დიდი და საინტერესო არჩევანი</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
