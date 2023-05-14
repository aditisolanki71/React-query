import axios from "axios";
import { useQuery } from "react-query";
const fetchUsers = () => {
    return axios.get('http://localhost:3001/users')
}

const fetchPosts = () => {
    return axios.get('http://localhost:3001/posts')
}

const RQParallelQuery = () => {
    const { data: users } = useQuery('fetch-users',fetchUsers)
    const { data: posts } = useQuery('fetch-users',fetchPosts)
   
    return (
        <div>
            RQ Parallel query
            <h2>USERS</h2>
            <ul>
                {users?.data?.map(user => {
                    return <li>{user.name}</li>
                })
            }
            </ul>
            <h2>POSTS</h2>
            <ul>
                {posts?.data?.map(post => {
                    return <li>{post.name}</li>
                })
            }
            </ul>
        </div>
    )
}

export default RQParallelQuery;