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
    console.log("Query Results",queryResults)
    return (
        <div>
            RQ Dynamic Parallel Query:-
        </div>
    )
}
export default RQDynamicParallelQueryPage;