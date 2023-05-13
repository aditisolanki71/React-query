import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './components/Users';
import HomePage from './components/Home.page';
import RQUserPage from './components/RQUser.page';

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function App() {
  return (
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
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Users" element={<UsersPage />} />
        <Route path="/rqusers"element={<RQUserPage/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;