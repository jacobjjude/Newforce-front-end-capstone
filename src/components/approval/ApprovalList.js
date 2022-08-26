import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const ApprovalList = () => {
    const [notApproved, setNotApproved] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8088/cocktails?isApproved=false`)
        .then(response => response.json())
        .then(data => {
            setNotApproved(data)
        })
    }, [])
    return (
        <>
        <h1>It Works!</h1>
        {
            notApproved.map(item => {
                return (
                    <>
                    <div>
                        <h4>{item.name}</h4>
                        <footer>
                            <Link to={`/cocktail/${item.id}/edit`}><button>Edit/Approve</button></Link>
                        </footer>
                    </div>
                    </>
                )
            })
        }
        </>
    )
}