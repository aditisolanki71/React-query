import axios from "axios";
import { useQuery } from "react-query"; 
const fetchUsers = () => {
    return axios.get("http://localhost:3001/users")
}

export const useUsersData = (onSuccess, onError) => {
    return useQuery(
        "fetch-users",
        fetchUsers,
        {
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
                //return updatedData;
                 return data;
            }
        }
    ) 
}
export default useUsersData;