import "./Home.css";
import { useState, useEffect } from "react";

export const Home = () => {
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/cocktails?_embed=scores&isApproved=true`)
      .then((response) => response.json())
      .then((data) => {
        setSorted(calculate(data));
      })
  }, []);

  const calculate = (data) => {
    let sortedArray = [];
    data.map((x) => {
      let counter = 0;

      x.scores.map((y) => {
        if (y.vote === true) {
          counter++;
        } else if (y.vote === false) {
          counter--;
        }
      });
      sortedArray.push({
        id: x.id,
        name: x.name,
        score: counter,
      });
    });

    let output = sortedArray.sort((a,b) => b.score-a.score)
    return output
  };
  

  return (
    <>
      <div className="home__container">
        <div className="home__welcome">
          <h1>Welcome!</h1>
          <p>Enjoy your stay and your drinks!</p>
        </div>
        <div className="home__img">
          <img src="background.jpg" alt=""></img>
        </div>
        <div className="top__cocktails">
          <h2>Top cocktails</h2>
          {sorted.map((x) => {
            return (
              <>
                <div className="topcocktail__card">
                  <p>{x.name}</p>
                  <p>
                    <b>{x.score}</b>
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
