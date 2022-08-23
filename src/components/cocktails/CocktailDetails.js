import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Cocktails.css"

export const CocktailDetails = () => {
    const [cocktail, updateCocktail] = useState({})
    const { cocktailId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/cocktails?id=${cocktailId}`)
        .then(response => response.json())
        .then(data => {
            const singleCocktail = data[0]
            updateCocktail(singleCocktail)
        })
    },[])
    return (
        <>
        <section>
            <header>{cocktail.name}</header>
            <ul>Ingredients
                {
                    cocktail?.ingredients?.map(item => {
                        return <li>{item}</li>
                    })
                }
            </ul>
            <ul>Instructions
                <li>{cocktail.instructions}</li>
            </ul>
            <ul>Glass
                <li>{cocktail.glass}</li>
            </ul>
            <ul>Garnish
                <li>{cocktail.garnish}</li>
            </ul>
            <footer><button>Add to Favorites</button></footer>
        </section>
        </>
    )
}