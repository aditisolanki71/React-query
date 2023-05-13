import axios from "axios";
import { useQuery } from "react-query"; 

const RQUserPage = () => {
    const { data : getUsers, isLoading, isError, error} = useQuery("fetch-users", () => {
        return axios.get("http://localhost:3001/users")
    }) 

    if(isLoading) {
        return <h2>Loading RQUsers...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }

    console.log("RX", getUsers)
    return (
        <div>
            RQUserPage Page
            <ul>
                {getUsers?.data?.map((user) => {
                    return (
                        <li key={user.id}>{user.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}
export default RQUserPage;