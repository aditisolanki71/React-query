import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react"

const fetchColors = (pageNumber) => {
    return axios.get(`http://localhost:3001/colors?_limit=2&_page=${pageNumber}`)
}

// http://localhost:3001/colors?_limit=2&_page=1
const RQPaginatedQueriesPage = () => {
    const [pageNumber,setPageNumber] = useState(1);
    const { data: colors,isLoading, isError, error } = useQuery(
        ['fetch-colors', pageNumber],
        () => fetchColors(pageNumber),
        {
            keepPreviousData: true
        }
    )
    console.log("color data is",colors)

    if(isLoading) {
        return <h2>Loading Colors...</h2>
    }

    if(isError) {
        return <h2>{error}</h2>
    }

    return (
        <>        
        <div>
            Paginated Queries Page:-
            <ul>
                {colors?.data.map(color => <li key={color.id}>{color.label}</li>)}
            </ul>
        </div>
        <div>
            <button 
                onClick={() => setPageNumber(page => page-1)}
                disabled={pageNumber === 1}
            >
                Prev
            </button>
            <button 
                onClick={() => setPageNumber(page => page+1)}
                disabled={pageNumber === 4}
            >
                Next
            </button>
        </div>
        </>

    )
}
export default RQPaginatedQueriesPage;