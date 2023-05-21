import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
    console.log("email is",email)
    return axios.get(`http://localhost:3001/myUsers/${email}`)
}

const fetchCourrsesByChannelId = (channelId) => {
    return axios.get(`http://localhost:3001/channels/${channelId}`)
}
//fetch list of posts for userids
const RQDependentQueriesPage = ({ email }) => {
    console.log("dependent email is",email)
    //now you have particular user
    // const {data: user} = useQuery(['user',email], fetchUserByEmail(email) )
    // console.log("user is",user)
    
    // //now access posts from particular userid
    // const channelId = user?.data.channelId;
    // console.log("channel id",channelId)

    // const {data: channels} = useQuery(
    //     ['courses',channelId],
    //     () => fetchCourrsesByChannelId(channelId), {
    //     enabled: !!channelId
    // })
    // console.log("channels",channels)

    return (
        <div>RQ Dependent queries</div>
    )
}
export default RQDependentQueriesPage;