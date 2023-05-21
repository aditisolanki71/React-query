import { Link, useParams } from "react-router-dom";
import useUserData from "./hooks/useUserData";


const RQUserInitialData = () => {
    const { userId } = useParams();
    const { isLoading, data, isError, error } = useUserData(userId);
    console.log("isloading",isLoading)
    console.log("data",data)
    console.log("iserror",isError)
    console.log("error",error)

    if(isLoading) {
        return <h2>Loading....</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <div>
            <h3>user initial data detail:-</h3>
            {data.data.name} 
            <Link to="/rqusers">Back</Link>
        </div>
    )
}

export default RQUserInitialData;