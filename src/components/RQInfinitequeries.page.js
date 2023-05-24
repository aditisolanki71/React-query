import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Fragment, useState } from "react"

const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:3001/colors?_limit=2&_page=${pageParam}`)
}

// http://localhost:3001/colors?_limit=2&_page=1
const RQInfiniteQueriesPage = () => {
    const [pageNumber,setPageNumber] = useState(1);
    const { 
            data: colors,
            isLoading,
            isError,
            error,
            hasNextPage, 
            fetchNextPage,
            isFetching,
            isFetchingNextPage
        } = useInfiniteQuery(
        ['fetch-colors'],
         fetchColors,
         {
            getNextPageParam: (_lastPage, pages) => {
                if(pages.length < 4) {
                    return pages.length + 1
                }
                else {
                    return undefined;
                }
            }
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
                <div>
                    {colors?.pages.map((group,index) => {
                        return (
                            <Fragment key={index}>
                               {group.data.map((color) => (
                                <h2 key={color.id}>{color.id} {color.label}</h2>
                               ))}
                            </Fragment>
                        )}
                    )}
                </div>
            </div>
            <button disabled={!hasNextPage} onClick={fetchNextPage}> 
                Load more
            </button>
            <div>
                {isFetching && !isFetchingNextPage ? "Fetching" : null}
            </div>
        </>
    )
}
export default RQInfiniteQueriesPage;