import { useState, useEffect } from "react"

export const Favorites = () => {
    const [favorites, setFavorites] = useState([])
    const localCocktailUser = localStorage.getItem("activeUser")
    const cocktailUserObject = JSON.parse(localCocktailUser)

    useEffect(() => {
        fetch(`http://localhost:8088/myDrinks?_expand=cocktail&userId=${cocktailUserObject.id}`)
        .then(response => response.json())
        .then(data => {
            setFavorites(data)
        })
    }, [])

    return (
        <>
        {
            favorites.map(item => {
                return (
                <>
                <header>{item?.cocktail?.name}</header>
                <footer><button>Remove from favorites</button></footer>
                </>)
            })
        }
        </>
    )
}