import { useQueries } from "react-query"
import axios from "axios";

const fetchUser = (userId) => {
    return axios.get(`http://localhost:3001/users/${userId}`)
}

const RQDynamicParallelQueryPage = ({ userIds }) => {
    const queryResults = useQueries(
        userIds.map(uid => {
            return {
                queryKey: ['fetch-user',uid],
                queryFn: () => fetchUser(uid)
            }
        })
    )
    console.log("Dynamic Query Results",queryResults)
    return (
        <div>
            RQ Dynamic Parallel Query:-
            Please check console
            <ul>
               {queryResults?.map?.data?.data(res => <li>{res.name}</li>)}
            </ul>
        </div>
    )
}
export default RQDynamicParallelQueryPage;