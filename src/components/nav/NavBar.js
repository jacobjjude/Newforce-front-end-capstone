import {Link, useNavigate} from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    const localCocktailUser = localStorage.getItem("activeUser")
    const cocktailUserObject = JSON.parse(localCocktailUser)
    const navigate = useNavigate()

    return (
        <ul className="navbar">
        <li className="navbar__item active">
            <Link to="/">Home</Link>
        </li>
        <li className="navbar__item active">
            <Link to="/cocktails">Cocktails</Link>
        </li>
        <li className="navbar__item active">
            <Link to="/submit">Submit a Cocktail</Link>
        </li>
        <li className="navbar__item active">
            <Link to="/favorites">Favorites</Link>
        </li>
            {localStorage.getItem("activeUser") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("activeUser");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
        </ul>
    )
}