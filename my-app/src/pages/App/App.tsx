import '../..//styles/App.css';
import { BrowserRouter, Routes, Route, Navigate, RouteProps } from 'react-router-dom';
import Top from '../Top/Top';
import { AuthProvider } from '../../authenticaion/AuthContext';
import Signup from '../Signup/Signup';
import Dashboard from '../Dashboard/Dashboard';
import PostDetail from '../Post/PostDetail';
import { AuthContext } from '../../authenticaion/AuthContext';
import { useContext } from 'react';
import NewPost from '../NewPost/NewPost';
import Mypage from '../Mypage/MyPage';
import EditPost from '../EditPost/EditPost';

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
