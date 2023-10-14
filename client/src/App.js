import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/_Layout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
