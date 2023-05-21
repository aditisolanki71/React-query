
import { useState } from "react";
import { useUsersData } from "../components/hooks/useUsersData"
import { Link } from "react-router-dom";

//Task:-
// combing polling with callback
// use refetchinterval to poll data on every 3 sec
// behind scene chage or add data in db.json
 //data.length is 12 or any error then stop refetching

const RQUserPage = () => {

    const [flag, setFlag] = useState(false);

    const onSuccess = (data) => {
        console.log("onSuccess called", data)
        // if(data.data.length === 14) {
        //     console.log("success")
        //     setFlag(true)
        // }
    }

    const onError = (error) => {
        console.log("onError called", error)
        // if(error.message) {
        //     console.log("Error")
        //     setFlag(true)
        // }
    }

    const { 
            data : getUsers,
            isLoading, 
            isError, 
            error,
            refetch
        } = useUsersData(onSuccess, onError)

    if(isLoading) {
        return <h2>Loading RQUsers...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }

    console.log("rx user loadig",isLoading)
    console.log("RX", getUsers)
    return (
        <div>
            RQUserPage Page
            {/* <button onClick={refetch}>Click me</button> */}
            <ul>
                {getUsers?.data?.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link to={`/rqusers/${user.id}`}>{user.name}</Link>
                        </li>
                    )
                })}
                {/* {getUsers?.userEmails?.map((email) => {
                    return (
                        <li key={email}>{email}</li>
                    )
                })} */}
            </ul>
        </div>
    )
}
export default RQUserPage;