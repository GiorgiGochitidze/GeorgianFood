import { useState } from "react";
import "./CSS/auth.css";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleRegister = () => {
    if (!username || !gmail || !password) {
      console.log("please fill all fields");
      setMessage("გთხოვთ შეავსოთ ყველა ველი");

      setTimeout(() => {
        setMessage(false);
      }, 1500);
      return;
    }

    if (password.length < 6) {
      setMessage("პაროლი უნდა იყოს 6 ასობგერაზე მეტი");
      setTimeout(() => {
        setMessage(false);
      }, 1500);
      return;
    }

    if (!handleGmailCheck()) {
      setMessage("გთხოვთ შეიყვანოთ სწორი Gmail-ი");
      setTimeout(() => {
        setMessage(false);
      }, 1500);
      return;
    }

    const userData = {
      username: username,
      gmail: gmail,
      password: password,
    };

    axios
      .post("http://localhost:5000/register", userData)
      .then(() => {
        console.log("Registered Succesfully");
        setMessage('რეგისტრაცია წარმატებით დასრულდა')

        setTimeout(() => {
          navigate('/login')
          window.location.reload()
        }, 1200)
      })
      .catch((err) => {
        conosle.log("Internal Server error", err);
      });
  };

  const handleGmailCheck = () => {
    return gmail.endsWith("@gmail.com");
  };

  return (
    <div className="authform-container">
      <h1 style={{ textAlign: "center" }}>რეგისტრაცია</h1>
      <Form
        username={username}
        gmail={gmail}
        password={password}
        setUsername={setUsername}
        setGmail={setGmail}
        setPassword={setPassword}
        buttonName={"რეგისტრაცია"}
        handleSubmit={handleRegister}
        message={message}
      />
    </div>
  );
};

export default Register;
