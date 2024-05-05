import "./App.css";
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LogIn from "./Components/LogIn";
import Register from "./Components/Register";
import Recipes from "./Components/Recipes";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Recipes" element={<Recipes />} />
      </Routes>
    </Router>
  );
}

export default App;
