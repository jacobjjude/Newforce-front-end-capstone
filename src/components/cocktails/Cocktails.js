import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Cocktails.css"

export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([])
    const localCocktailUser = localStorage.getItem('activeUser')
    const activeCocktailUser = JSON.parse(localCocktailUser)

    useEffect(() => {
        fetch(`http://localhost:8088/cocktails?_expand=alcohol&_expand=flavor`)
        .then(response => response.json())
        .then(cocktailArray => {
            setCocktails(cocktailArray)
        })
    },[])

    return (
        <>
        {
            cocktails.map(cocktail => {
                return <>
                <div>
                    <header><Link to={`/cocktails/${cocktail.id}`}>{cocktail.name}</Link></header>
                    <footer>
                        <ul>
                            <li>{cocktail?.flavor?.name}</li>
                            <li>{cocktail?.alcohol?.name}</li>
                            <li><button>Add to Favorites</button></li>
                        </ul>
                    </footer>
                </div>
                </>
            })
        }
        </>
    )
}