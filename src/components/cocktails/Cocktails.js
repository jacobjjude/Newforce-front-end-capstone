import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {React} from "react"
import "./Cocktails.css"

export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([])
    const [favorites, setFavorites] = useState([])
    const localCocktailUser = localStorage.getItem('activeUser')
    const activeCocktailUser = JSON.parse(localCocktailUser)

    useEffect(() => {
        fetch(`http://localhost:8088/cocktails?_expand=alcohol&_expand=flavor`)
        .then(response => response.json())
        .then(cocktailArray => {
            setCocktails(cocktailArray)
        })
    },[])

    useEffect(() => {
        fetch(`http://localhost:8088/myDrinks`)
        .then(response => response.json())
        .then(data => {
            setFavorites(data)
        })
    }, [])

    const addToFavorites = (cocktail) => {
        const drinkToAddToFavorites = {
            userId: activeCocktailUser.id,
            cocktailId: cocktail.id
        }
        
        fetch(`http://localhost:8088/myDrinks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(drinkToAddToFavorites)
            })
            .then(response => response.json()) 
        }
        
    const isFavorited = (cocktail) => {
        const foundFavorites = favorites.find(x => x.cocktailId === cocktail.id && x.userId === activeCocktailUser.id)
        if (foundFavorites) {
            return true
        } else {
            return false
        }
    }
    
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
                            {
                                (!isFavorited(cocktail))
                                ?<li><button onClick={() => {
                                    addToFavorites(cocktail);
                                    window.location.reload(false)
                                }}>Add to Favorites</button></li>
                                : <li><i>This item has already been favorited</i></li>
                            }
                            
                            
                        </ul>
                    </footer>
                </div>
                </>
            })
        }
        </>
    )
}