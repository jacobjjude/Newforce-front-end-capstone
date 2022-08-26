import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {React} from "react"
import "./Cocktails.css"
import { Approve } from "../approval/Approve"

export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([])
    const [favorites, setFavorites] = useState([])
    const localCocktailUser = localStorage.getItem('activeUser')
    const activeCocktailUser = JSON.parse(localCocktailUser)

    useEffect(() => {
        fetch(`http://localhost:8088/cocktails?_expand=alcohol&_expand=flavor&isApproved=true`)
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
        <div className="cocktail__container">
        <div className="cocktail__list">
        {
            cocktails.map(cocktail => {
                return <>
                <div className="cocktail__item">
                    <header><Link to={`/cocktails/${cocktail.id}`}><h3>{cocktail.name}</h3></Link></header>
                    <footer className="cocktail__footer">
                        
                            <p className="footer cocktail__flavor">{cocktail?.flavor?.name}</p>
                            <p className="footer cocktail__alcohol">{cocktail?.alcohol?.name}</p>
                            {
                                (!isFavorited(cocktail))
                                ?<p className="footer cocktail__button"><button onClick={() => {
                                    addToFavorites(cocktail);
                                    window.location.reload(false)
                                }}>Add to Favorites</button></p>
                                : <p className="footer"><i>Already in favorites</i></p>
                            }
                            
                            
                        
                    </footer>
                </div>
                </>
            })
        }
        </div>
        {
            (!activeCocktailUser.isBartender)
            ? < Approve/>
            : ""
        }
        </div>
        </>
    )
}