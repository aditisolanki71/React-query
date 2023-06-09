import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './components/Users';
import HomePage from './components/Home.page';
import RQUserPage from './components/RQUser.page';
import { QueryClient, QueryClientProvider} from "react-query"
import NoMatch from './components/NoMatch.page';
import { ReactQueryDevtools } from 'react-query/devtools';
import RQUserDetail from './components/RQUserDetail';
import ParallelQuery from './components/RQParallelQuery.page';
import RQDynamicParallelQueryPage from "./components/RQDynamicParallelQuery.page";
import RQDependentQueriesPage from "./components/DependentQueries.page"
import RQUserInitialData from './components/RQUserInitialData.page';
import RQPaginatedQueriesPage from './components/RQPaginatedQueries.page';
import RQInfiniteQueriesPage from './components/RQInfinitequeries.page';
import MutationsRQUserPage from './components/MutationsRQUsers.page';
const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <nav style={{ margin: 10 }}>
            <Link to="/" style={{ padding: 5 }}>
            Home
            </Link>
            <Link to="/users" style={{ padding: 5 }}>
            Users
            </Link>
            <Link to="/rqusers" style={{ padding: 5 }}>
            RQUsers
            </Link>
            <Link to="/rq-parallel" style={{ padding: 5 }}>
            RQ Parallel Query
            </Link>
            <Link to="/rq-dynamic-parallel" style={{ padding: 5 }}>
            RQ Dynamic Parallel Query
            </Link>
            <Link to="/rq-dependent" style={{ padding: 5 }}>
            RQ Dependent Query
            </Link>
            <Link to="/rq-user-initial" style={{ padding: 5 }}>
            RQ User initial Data
            </Link>
            <Link to="/rq-paginated" style={{ padding: 5 }}>
            RQ Paginated Queries
            </Link>
            <Link to="/rq-infinite-query" style={{ padding: 5 }}>
            RQ Infinite Queries
            </Link>
            <Link to="/mutaions-rq-users" style={{ padding: 5 }}>
            Mutations RQ Users
            </Link>
        </nav>
        <Routes>
          <Route path="/rqusers/:userId" element={<RQUserDetail />} />
          <Route path="/Users" element={<UsersPage />} />
          <Route path="/rqusers"element={<RQUserPage/>} />
          <Route path="/rq-parallel"element={<ParallelQuery/>} />
          <Route path="/rq-dynamic-parallel"element={<RQDynamicParallelQueryPage userIds={[1,2,3]}/>} />
          <Route path="/rq-dependent"element={<RQDependentQueriesPage email="aditisolanki@gmail.com"/>} />
          <Route path="/rq-user-initial" element={<RQUserInitialData/>} />
          <Route path="/rq-paginated" element={<RQPaginatedQueriesPage/>} />
          <Route path="/rq-infinite-query" element={<RQInfiniteQueriesPage/>} />
          <Route path="/mutaions-rq-users" element={<MutationsRQUserPage/>} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;