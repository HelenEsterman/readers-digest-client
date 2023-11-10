import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./authorization/Login";
import { Register } from "./authorization/Register";
import { Authorized } from "./authorization/Authorized";
import { Home } from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
