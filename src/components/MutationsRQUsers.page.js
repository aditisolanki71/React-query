
import { useState } from "react";
import { useUsersData, useAddUserData } from "../components/hooks/useUsersData"
import { Link } from "react-router-dom";

//Task:-
// combing polling with callback
// use refetchinterval to poll data on every 3 sec
// behind scene chage or add data in db.json
 //data.length is 12 or any error then stop refetching

const MutationsRQUserPage = () => {

    const [name, setName] = useState('');
    const [contact, setContact] = useState('')

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
            // isLoading, 
            // isError, 
            // error,
            refetch
        } = useUsersData(onSuccess, onError)


    const {mutate: addUser, isLoading, isError, error} = useAddUserData();
    
    const handleAddClick = () => {
        console.log("handle add click", name, contact)
        const user = {name,contact}
        addUser(user)
    }
  

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
            Mutations User Page
           
            <div>
                <input 
                    type="text" 
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
                <button onClick={handleAddClick}>Add User</button>
            </div>
             <button onClick={refetch}>Click me</button>
            <ul>
                {getUsers?.data?.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link to={`/rqusers/${user.id}`}>{user.name} - {user.contact}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default MutationsRQUserPage;