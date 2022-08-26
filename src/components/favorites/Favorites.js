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

    const removeFromFavorites = (item) => {
        fetch(`http://localhost:8088/myDrinks/${item.id}`, {
            method: "DELETE"
        })
    }

    return (
        <>
        {
            favorites.map(item => {
                return (
                <>
                <header>{item?.cocktail?.name}</header>
                <footer><button onClick={() => {
                    removeFromFavorites(item);
                    //Change this .get and set state.
                    //Same in cocktails.js
                    window.location.reload(false)
                }}>Remove from favorites</button></footer>
                </>)
            })
        }
        </>
    )
}