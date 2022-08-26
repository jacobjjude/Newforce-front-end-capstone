import { Outlet, Route, Routes } from "react-router-dom";
import { Cocktails } from "../cocktails/Cocktails";
import { Favorites } from "../favorites/Favorites";
import { Home } from "../home/Home";
import { Submit } from "../submit/Submit";
import { CocktailDetails } from '../cocktails/CocktailDetails'
import { ApprovalList } from "../approval/ApprovalList";
import { ApproveEdit } from "../approval/ApproveEdit";
import './views.css'

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cocktails" element={<Cocktails />}></Route>
            <Route path="/submit" element={<Submit />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="cocktails/:cocktailId" element={<CocktailDetails />}></Route>
            <Route path="/approve" element={<ApprovalList />}></Route>
            <Route path="/cocktail/:cocktailId/edit" element={<ApproveEdit />}></Route>
        </Routes>
    )
}