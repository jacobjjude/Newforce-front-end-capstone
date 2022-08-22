import { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    //function to handle the login
    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
        .then(response => response.json())
        .then(foundUsers => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem("activeUser", JSON.stringify({
                    id: user.id
                }))

                navigate('/home')
            }
            else {
                window.alert("Invalid Login")
            }
        })
    }

    //return html for login page
    return (
        <>
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Cocktails</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
        </>
    )
}