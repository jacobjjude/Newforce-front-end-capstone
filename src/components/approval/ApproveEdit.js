import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Approval.css'

export const ApproveEdit = () => {
  const [drink, update] = useState({
    alcoholId: 0,
    ingredients: [],
    instructions: "",
    glass: "",
    isApproved: false,
    approvedBy: 0,
    submittedBy: 0,
    garnish: "",
    flavorId: 0,
    name: "",
  });
  const [flavor, setFlavors] = useState([]);
  const [alcohol, setAlcohol] = useState([]);
  const [counter, setCounter] = useState();
  const { cocktailId } = useParams();
  const navigate = useNavigate();
  const localCocktailUser = localStorage.getItem("activeUser");
  const cocktailUserObject = JSON.parse(localCocktailUser);

  useEffect(() => {
    fetch(
      `http://localhost:8088/cocktails/${cocktailId}?_expand=alcohol&_expand=flavor&isApproved=true`
    )
      .then((response) => response.json())
      .then((data) => {
        update(data);
      });
  }, [cocktailId]);

  const increaseCount = (event) => {
    event.preventDefault();
    return setCounter(counter + 1);
  };

  const decreaseCount = (event) => {
    event.preventDefault();
    return setCounter(counter - 1);
  };

  const getAllAlcohol = () => {
    return fetch(`http://localhost:8088/alcohol`)
      .then((response) => response.json())
      .then((data) => {
        setAlcohol(data);
      });
  };

  const getAllFlavor = () => {
    return fetch(`http://localhost:8088/flavors`)
      .then((response) => response.json())
      .then((data) => {
        setFlavors(data);
      });
  };

  useEffect(() => {
    getAllAlcohol();
    getAllFlavor();
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    //cocktail to send to API
    const drinkToSendToAPI = {
      alcoholId: drink.alcoholId,
      ingredients: drink.ingredients,
      instructions: drink.instructions,
      glass: drink.glass,
      isApproved: true,
      approvedBy: cocktailUserObject.id,
      submittedBy: drink.submittedBy,
      garnish: drink.garnish,
      flavorId: drink.flavorId,
      name: drink.name,
    };
    fetch(`http://localhost:8088/cocktails/${cocktailId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drinkToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  const ingredientEdit = () => {
    let content = [];
    for (let i = 0; i < drink.ingredients.length; i++) {
      content.push(
        <input
          required
          autoFocus
          type="text"
          key={i}
          value={drink.ingredients[i]}
          id={`ing--${i}`}
          placeholder={drink.ingredients[i]}
          onChange={(evt) => {
            const copy = { ...drink };
            copy.ingredients[i] = evt.target.value;
            update(copy);
          }}
        ></input>
      );
    }
    return (
      <>
        {content}
        <button
          onClick={(evt) => {
            evt.preventDefault();
            setCounter(counter + 1);
          }}
        >
          Add ingredient line
        </button>
        <button
          onClick={(evt) => {
            evt.preventDefault();
            setCounter(counter - 1);
          }}
        >
          Remove ingredient line
        </button>
      </>
    );
  };

  return (
    <>
    <div className="edit__container">
      
      <form className="edit__form">
        <h1>Approval for: {drink.name}</h1>
        <fieldset>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              required
              autoFocus
              type="text"
              value={drink.name}
              placeholder={drink.name}
              onChange={(evt) => {
                const copy = { ...drink };
                copy.name = evt.target.value;
                update(copy);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="glass">Glass: </label>
            <input
              required
              autoFocus
              type="text"
              placeholder={drink.glass}
              value={drink.glass}
              onChange={(evt) => {
                const copy = { ...drink };
                copy.glass = evt.target.value;
                update(copy);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="garnish">Garnish: </label>
            <input
              required
              autoFocus
              type="text"
              placeholder={drink.garnish}
              value={drink.garnish}
              onChange={(evt) => {
                const copy = { ...drink };
                copy.garnish = evt.target.value;
                update(copy);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="alchol">Select an alcohol: </label>
            <select
              required
              autoFocus
              value={drink.alcoholId}
              onChange={(evt) => {
                const copy = { ...drink };
                copy.alcoholId = parseInt(evt.target.value);
                update(copy);
              }}
            >
              {alcohol.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div>
            <label htmlFor="flavor">Select a flavor: </label>
            <select
              required
              autoFocus
              value={drink.flavorId}
              onChange={(evt) => {
                const copy = { ...drink };
                copy.flavorId = parseInt(evt.target.value);
                update(copy);
              }}
            >
              {flavor.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="form__ingredients">
            <label htmlFor="ingredients">Ingredients: </label>
            {drink?.ingredients?.map((item, index) => {
              return (
                <>
                  <input
                    required
                    autoFocus
                    type="text"
                    key={index}
                    value={item}
                    id={`ing--${index}`}
                    class="ingredient"
                    placeholder={item}
                    onChange={(evt) => {
                      const copy = { ...drink };
                      copy.ingredients[index] = evt.target.value;
                      update(copy);
                    }}
                  ></input>
                </>
              );
            })}
            <button
              onClick={(e) => {
                e.preventDefault();
                const copy = { ...drink };
                copy.ingredients.push("Enter a new ingredient");
                update(copy);
              }}
            >
              Add Ingredient
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                const copy = { ...drink };
                copy.ingredients.pop();
                update(copy);
              }}
            >
              Remove Ingredient
            </button>
          </div>
        </fieldset>
        <button
          onClick={(clickEvent) => {
            handleSaveButtonClick(clickEvent);
          }}
          className="btn btn-primary"
        >
          Submit Cocktail
        </button>
      </form>
    </div>
    </>
  );
};

//select value={.flavorId?} => option selected = true (if select value doesn't work)
