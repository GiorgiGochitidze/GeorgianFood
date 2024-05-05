import { useState } from "react";
import "./CSS/auth.css";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleLogIn = () => {
    if (!username || !gmail || !password) {
      console.log("please fill all fields");
      setMessage("გთხოვთ შეავსოთ ყველა ველი");

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
      .post("http://localhost:5000/login", userData)
      .then((response) => {
        console.log("LogIn Succesfully");
        setMessage("შესვლა წარმატებით დასრულდა");

        const { token } = response.data;

        sessionStorage.setItem('token', token)

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1200);
      })
      .catch((err) => {
        console.log("Internal Server error", err);
      });
  };

  const handleGmailCheck = () => {
    return gmail.endsWith("@gmail.com");
  };

  return (
    <div className="authform-container">
      <h1 style={{ textAlign: "center" }}>შესვლა</h1>
      <Form
        username={username}
        gmail={gmail}
        password={password}
        setUsername={setUsername}
        setGmail={setGmail}
        setPassword={setPassword}
        buttonName={"შესვლა"}
        handleSubmit={handleLogIn}
        message={message}
      />
    </div>
  );
};

export default LogIn;
