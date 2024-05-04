import burger from "../assets/burger.png";
import "./CSS/welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-text">
        <h1 style={{ marginLeft: "50px" }}>
          <span style={{ color: "#20263C" }}>იმოგზაურეთ</span> ახალი{" "}
          <span style={{ color: "#20263C" }}>რეცეპტების</span> სამყაროში
          <span style={{ color: "#20263C" }}> ჩვენს </span>
          ერთად
        </h1>
        <p style={{ marginLeft: "50px", color: "gray", marginTop: "30px" }}>
          მოგვყევით კულინარიულ თავგადასავალში, როგორც სხვა და დაიწყეთ მოგზაურობა
          კულტურისა და ტრადიციების გავლით.
        </p>
      </div>
      <img src={burger} alt="burger image" />
    </div>
  );
};

export default Welcome;
