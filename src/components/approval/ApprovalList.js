import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import './Approval.css'

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
        <div className="unapproved__container">
            <h2>Unapproved cocktails</h2>
        {
            notApproved.map(item => {
                return (
                    <>
                    <div className="unapproved__card">
                        <h4>{item.name}</h4>
                        <footer>
                            <Link to={`/cocktail/${item.id}/edit`}><button>Edit/Approve</button></Link>
                        </footer>
                    </div>
                    </>
                )
            })
        }
        </div>
        </>
    )
}