import axios from "axios"
import { useEffect, useState } from "react";

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3001/users").then(res => {
            setUsers(res.data);
            setIsLoading(false)
        }).catch(err => {
            setIsError(err.message)
            setIsLoading(false)
        })
    },[])
    return (
        <div>
            Users Page
            {isLoading && <p>Loading...</p>}
            {isError && <p>{isError}</p>}
            <ul>
                {users.map(user => {
                    return <li key={user.id}>{user.name}</li>
                })}
            </ul>
        </div>
    )
}
export default UsersPage;