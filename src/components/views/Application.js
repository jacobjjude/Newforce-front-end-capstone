import { Outlet, Route, Routes } from "react-router-dom";
import { Cocktails } from "../cocktails/Cocktails";
import { Favorites } from "../favorites/Favorites";
import { Home } from "../home/Home";
import { Submit } from "../submit/Submit";
import { CocktailDetails } from '../cocktails/CocktailDetails'

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cocktails" element={<Cocktails />}></Route>
            <Route path="/submit" element={<Submit />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="cocktails/:cocktailId" element={<CocktailDetails />}></Route>
        </Routes>
    )
}