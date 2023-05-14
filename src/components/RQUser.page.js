import axios from "axios";
import { useQuery } from "react-query"; 

const fetchUsers = () => {
    return axios.get("http://localhost:3001/users")
}

const RQUserPage = () => {

    const onSuccess = (data) => {
        console.log("onSuccess called", data)
    }

    const onError = (error) => {
        console.log("onError called", error)
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
            //refetchOnMount: true,
            
            // refetchOnWindowFocus: false
            // refetchOnWindowFocus: 'always'
            //refetchOnWindowFocus: true,

            //refetchInterval: false,
            // refetchInterval: 2000

            //refetchIntervalInBackground: true

            enabled: false,
            onSuccess: onSuccess,
            onError: onError
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
            <button onClick={refetch}>Click me</button>
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