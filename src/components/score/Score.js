import { useEffect, useState } from "react";
import './score.css'

export const Score = ({ scores, cocktail, up }) => {
  const [score, setScore] = useState([]);
  const localCocktailUser = localStorage.getItem("activeUser");
  const activeCocktailUser = JSON.parse(localCocktailUser);

  const calculation = () => {
    let counter = 0;

    scores.map((item) => {
      if (item.vote === true) {
        counter++;
      } else if (item.vote === false) {
        counter--;
      }
    });

    setScore(counter);
  };

  useEffect(() => {
    calculation();
  }, []);

  const upvote = () => {
    const itemToSendToAPI = {
      cocktailId: cocktail.id,
      userId: activeCocktailUser.id,
      vote: true,
    };
    fetch(`http://localhost:8088/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToSendToAPI),
    });
  };

  const downvote = () => {
    const itemToSendToAPI = {
      cocktailId: cocktail.id,
      userId: activeCocktailUser.id,
      vote: false,
    };
    fetch(`http://localhost:8088/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToSendToAPI),
    });
  };

  
  return (
    <>
    <div className="voting">
      <p
        className="voting__button__up"
        onClick={() => {
          upvote()
        }}
      >
        Up
      </p>
      <p className="voting__score">{score}</p>
      <p className="voting__button__down"
        onClick={() => {
          downvote();
        }}
      >
        Down
      </p>
    </div>
    </>
  );
};
