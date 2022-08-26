import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Approve = () => {
    const [notApproved, setNotApproved] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8088/cocktails?isApproved=false`)
        .then(response => response.json())
        .then(data => {
            setNotApproved(data)
        })
    },[])
    return (
        <>
        <div>
            <h1>Hey!</h1>
            <p>There are {notApproved.length} cocktails waiting to be approved!</p>
            <Link to="/approve"><button>Get to approvin'!</button></Link>
        </div>
        </>
    )
}