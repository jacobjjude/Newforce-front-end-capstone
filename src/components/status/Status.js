import { useState, useEffect } from "react";
import './Status.css'

export const Status = ({ user }) => {
  const [unapproved, setUnapproved] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8088/cocktails?isApproved=false&submittedBy=${user.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUnapproved(data);
      });
  },[]);

  return (
    <>
    <div className="unapproved">
        <h1>Your recipe status</h1>
        <div>
            {
                unapproved.map(x => {
                    return (
                    <>
                    <h2>{x.name}</h2>
                    <p>This cocktail is currently <b>unapproved</b></p>
                    </>
                    )
                })
            }
        </div>
    </div>
    </>
  )
};
