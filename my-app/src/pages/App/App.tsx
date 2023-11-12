import '../..//styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isSignedIn } = useContext(AuthContext);
  return isSignedIn ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRoute>
                <PostDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <Mypage />
              </PrivateRoute>
            }
          />
          <Route
            path="/new"
            element={
              <PrivateRoute>
                <NewPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
