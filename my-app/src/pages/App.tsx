import '../styles/App.css';
import { BrowserRouter, Routes, Route, Navigate, RouteProps } from 'react-router-dom';
import Top from '../pages/Top';
import { AuthProvider } from '../components/AuthContext';
import Signup from './Signup';
import Dashboard from './Dashboard';
import PostDetail from './PostDetail';
import { AuthContext } from '../components/AuthContext';
import { useContext } from 'react';
import NewPost from './NewPost';
import Mypage from './MyPage';
import EditPost from './EditPost';

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
          <Route path="/user" element={<Mypage />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
