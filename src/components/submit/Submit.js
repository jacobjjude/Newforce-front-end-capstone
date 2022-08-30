import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './Submit.css'

export const Submit = () => {
    const [cocktail, update] = useState({
        alcoholId: 0,
        ingredients: [],
        instructions: "",
        glass: "",
        isApproved: false,
        approvedBy: 0,
        submittedBy: 0,
        garnish: "",
        flavorId: 0,
        name: ""
    })
    const [counter, setCounter] = useState(2)
    const [flavor, setFlavors] = useState([])
    const [alcohol, setAlcohol] = useState([])
    const navigate = useNavigate()
    const localCocktailUser = localStorage.getItem("activeUser")
    const cocktailUserObject = JSON.parse(localCocktailUser)

    //get and set alcohol types for dropdown later
    const getAllAlcohol = () => {
        return fetch(`http://localhost:8088/alcohol`)
        .then(response => response.json())
        .then(data => {
            setAlcohol(data)
        })
    }
    //get and set flavor types for dropdown later
    const getAllFlavor = () => {
        return fetch(`http://localhost:8088/flavors`)
        .then(response => response.json())
        .then(data => {
            setFlavors(data)
        })
    }

    useEffect(() => {
        getAllAlcohol();
        getAllFlavor();
    }, [])

    //function to grab all the ingredient inputs, put them in an array, and joint them into a string separated by "*"
    const handleIngredients = (event) => {
        const copy = {...cocktail}
    }

    useEffect(() => {
        if (cocktail.ingredients.length > counter){
            const copy = {...cocktail}
            copy.ingredients.pop()
            update(copy)
        }
    }, [counter])

    //function to increase and decrease counter, thereby adding another line to ingredients
    const increaseCount = (event) => {
        event.preventDefault()
        return setCounter(counter + 1)
    }

    const decreaseCount = (event) => {
        event.preventDefault()
        return setCounter(counter - 1)
    }

    //function to populate ingredients input
    const ingredientInput = () => {
        let content = []
        for (let i=0; i<counter; i++) {
            content.push(<input
            required autoFocus
            type="text"
            key={i}
            value={cocktail.ingredients[i]}
            id={`ing-${i}`}
            class="ingredient"
            onChange={(evt) => {
                const copy = {...cocktail}

               copy.ingredients[i] = evt.target.value
                update(copy)
            }}
            ></input>
            )
        }
        return content
    }

    //function to handle save button
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        //cocktail to send to API
        const drinkToSendToAPI = {
            alcoholId: cocktail.alcoholId,
            ingredients: cocktail.ingredients,
            instructions: cocktail.instructions,
            glass: cocktail.glass,
            isApproved: cocktail.isApproved,
            approvedBy: cocktail.approvedBy,
            submittedBy: cocktailUserObject.id,
            garnish: cocktail.garnish,
            flavorId: cocktail.flavorId,
            name: cocktail.name
        }
        fetch(`http://localhost:8088/cocktails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(drinkToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate('/')
        })
    }
    
    
    return (

        <div className="drink__container">
        <form className="drink__form">
            <h2>Submit a new recipe!</h2>
            <fieldset>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                    required autoFocus
                    type="text"
                    placeholder="Name of cocktail:"
                    value={cocktail.name}
                    onChange={
                        (evt) => {
                            const copy={...cocktail}
                            copy.name = evt.target.value
                            update(copy)
                        }
                    }></input>
                </div>
                <div>
                    <label htmlFor="glass">Glass: </label>
                    <input
                    required autoFocus
                    type="text"
                    placeholder="What glass should be used?"
                    value={cocktail.glass}
                    onChange={
                        (evt) => {
                            const copy={...cocktail}
                            copy.glass = evt.target.value
                            update(copy)
                        }
                    }></input>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions: </label>
                    <input
                    required autoFocus
                    type="text"
                    placeholder="How should the cocktail be built?"
                    value={cocktail.instructions}
                    onChange={
                        (evt) => {
                            const copy={...cocktail}
                            copy.instructions = evt.target.value
                            update(copy)
                        }
                    }></input>
                </div>
                <div>
                    <label htmlFor="garnish">Garnish: </label>
                    <input
                    required autoFocus
                    type="text"
                    placeholder="What garnish should be used?"
                    value={cocktail.garnish}
                    onChange={
                        (evt) => {
                            const copy={...cocktail}
                            copy.garnish = evt.target.value
                            update(copy)
                        }
                    }></input>
                </div>
                <div>
                    <label htmlFor="alcohol">Select a base alcohol: </label>
                    <select 
                    required autoFocus
                    onChange={
                        (evt) => {
                            const copy={...cocktail}
                            copy.alcoholId = parseInt(evt.target.value)
                            update(copy)
                        }
                    }
                    class="alcohol--dropdown">
                        <option value="0">Select an alcohol</option>
                       {
                        alcohol.map(item => {
                            return <option value={item.id}>{item.name}</option>
                        })
                       }
                    </select>
                </div>
                <div>
                    <label htmlFor="flavor">Select a flavor profile: </label>
                    <select
                    required autoFocus
                    onChange={
                        (evt) => {
                            const copy = {...cocktail}
                            copy.flavorId = parseInt(evt.target.value)
                            update(copy)
                        }
                    }>
                        <option value="0">Select a flavor</option>
                        {
                            flavor.map(item => {
                                return <option value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="ingredients">
                    <label htmlFor="ingredients">Ingredients: 
                    </label>
                    {
                        ingredientInput()
                    }
                    <button onClick={increaseCount}>Add Line</button>
                    <button onClick={decreaseCount}>Remove Line</button>
                </div>
            </fieldset>
            
            <button
            onClick={(clickEvent) => {
                handleSaveButtonClick(clickEvent)
            }}
            className="btn btn-primary">Submit Cocktail</button>
        </form>
    </div>
    )
}

// half oz water half oz OJ
// 
// 
//* .split('*')