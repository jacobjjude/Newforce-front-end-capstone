import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./components/views/Authorized";
import { NavBar } from "./components/nav/NavBar";
import { ApplicationViews } from "./components/views/Application";
import './App.css';

export const Cocktail = () => {
  return <Routes>
    <Route path="/login" element={< Login/>}></Route>
    <Route path="/register" element={< Register/>}></Route>
    

    <Route path="*" element={
      <Authorized>
        <>
        <NavBar />
        <ApplicationViews />
        </>
      </Authorized>
    }>

    </Route>
  </Routes>
}
