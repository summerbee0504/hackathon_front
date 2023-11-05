import '../styles/App.css';
import { BrowserRouter, Routes, Route, Navigate, RouteProps } from 'react-router-dom';
import Top from '../pages/Top';
import { AuthProvider } from '../components/AuthContext';
import Signup from './Signup';
import Dashboard from './Dashboard';
import PostDetail from './PostDetail';
import UserDetail from './UserDetail';
import { AuthContext } from '../components/AuthContext';
import { useContext } from 'react';

function PrivateRoute(_props: RouteProps): React.ReactElement | null {
  const { isSignedIn } = useContext(AuthContext);
  return isSignedIn ? <Route path={_props.path} element={_props.element} /> : <Navigate to="/" />;
}

function App() {
  //const { isSignedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/user" element={<UserDetail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
