import { useQuery } from "react-query";
import axios from "axios";

export const useUserData = (userId) => {

const fetchUserDetail = ({queryKey}) => {
    const userId = queryKey[1];
    console.log("fetch user detail",userId);
    return axios.get(`http://localhost:3001/users/${userId}`)
}
    return useQuery(
            ['fetch-user', userId],
            fetchUserDetail
    )   
}

export default useUserData;