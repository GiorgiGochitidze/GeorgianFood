import "./CSS/auth.css";
import Form from "./Form";

const Register = () => {
  return (
    <div className="authform-container">
      <h1 style={{ textAlign: "center" }}>რეგისტრაცია</h1>
      <Form buttonName={"რეგისტრაცია"} />
    </div>
  );
};

export default Register;
