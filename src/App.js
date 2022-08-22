import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import './App.css';

export const Cocktail = () => {
  return <Routes>
    <Route path="/" element={< Login/>}></Route>
    <Route path="/register" element={< Register/>}></Route>
  </Routes>
}
