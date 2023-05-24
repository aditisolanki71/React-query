import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query"; 
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
const addUser = (user) => {
    return axios.post("http://localhost:3001/users", user)
}
export const useAddUserData = () => {
    const queryClient = useQueryClient();
    return useMutation(addUser, {
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries('fetch-users')
        //     queryClient.setQueriesData('fetch-users', (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         }
        //     })
        // },
        onMutate: async (newUser) => {
            await queryClient.cancelQueries('fetch-users')
            const previousUserData = queryClient.getQueryData('fetch-users')
            queryClient.setQueriesData('fetch-users', (oldQueryData) => {
                    return {
                        ...oldQueryData,
                        data: [
                            ...oldQueryData.data,
                            {
                                id: oldQueryData.data.length + 1,
                                ...newUser 
                            },
                        ],
                    }
                })
                return {
                    previousUserData,
                }
            },
        onError: (_error, _username, context ) => {
            queryClient.setQueryData('fetch-users',context.previousUserData)
        },

        onSettled: () => {
            queryClient.invalidateQueries('fetch-users')
        }
    })
}