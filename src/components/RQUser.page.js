import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query"; 

const fetchUsers = () => {
    return axios.get("http://localhost:3001/users")
}
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
        } = useQuery(
        "fetch-users",
        fetchUsers,
        {
            // cacheTime: 5 * 60 * 60,
            // staleTime: 0,
            
            // refetchOnMount: false
            // refetchOnMount: 'always'
            refetchOnMount: true,
            
            // refetchOnWindowFocus: false
            // refetchOnWindowFocus: 'always'
            refetchOnWindowFocus: true,

            //refetchInterval: false,
             refetchInterval: flag === true ? false : 3000,

            //refetchIntervalInBackground: true

            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                console.log("Select data",data)
                const userNames = data.data.map(user => user.name);
                const userEmails = data.data.map(user => user.email);
                const updatedData = {
                    userNames,
                    userEmails
                }
                console.log("updated",updatedData)
                return updatedData;
                // return data;
            }
        }
    ) 

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
            {/* <button onClick={refetch}>Click me</button> */}
            <ul>
                {/* {getUsers?.data?.map((user) => {
                    return (
                        <li key={user.id}>{user.name}</li>
                    )
                })} */}
                {getUsers?.userEmails?.map((email) => {
                    return (
                        <li key={email}>{email}</li>
                    )
                })}
            </ul>
        </div>
    )
}
export default RQUserPage;