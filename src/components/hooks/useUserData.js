import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchUserDetail = ({queryKey}) => {
    const userId = queryKey[1];
    console.log("fetch user detail",userId);
    return axios.get(`http://localhost:3001/users/${userId}`)
}


export const useUserData = (userId) => {

    const queryClient = useQueryClient();

    return useQuery(
            ['fetch-user', userId],
            fetchUserDetail, 
            {
                initialData: () => {
                    const user = queryClient.getQueryData('fetch-users')
                            ?.data?.find(user => user.id = parseInt(userId))
                
                
                    if(user) {
                        return {
                            data: user
                        }
                    }
                    else {
                        return undefined;
                    }
                }
            }
    )   
}

export default useUserData;