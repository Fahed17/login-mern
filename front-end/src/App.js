import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Homepage from "./components/homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={(user._id) ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
