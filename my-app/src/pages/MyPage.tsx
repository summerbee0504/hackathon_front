import React, { useContext, useEffect, useState } from 'react';
import '../styles/UserDetail.css';
import { AuthContext } from '../components/AuthContext';
import { Avatar, Box } from '@mui/material';
import UserUpdateForm from '../components/UserUpdateForm';
import { useGetRequest } from '../components/useGetRequest';
import LikedPosts from '../components/LikedPosts';
import CategoryTabs from '../components/CategoryTabs';
import MyPosts from '../components/MyPosts';

interface user {
  id: string;
  name: string;
  term: number;
  bio: string;
  permission: string;
}

const Mypage = () => {
  const { currentUser } = useContext(AuthContext);
  const userImage = currentUser?.photoURL || '';
  const url = 'http://localhost:8080/user?id=' + currentUser?.uid;
  console.log('url: ', url);
  const { data: reqestedData } = useGetRequest(url);
  const [user, setUser] = useState<user>({ id: '', name: '', term: 0, bio: '', permission: 'user' });

  useEffect(() => {
    if (reqestedData) {
      setUser(reqestedData);
    }
  }, [reqestedData]);

  const [categoryKey, setCategoryKey] = useState(1);
  const handleSetKey = (newKey: number) => {
    setCategoryKey(newKey);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', padding: '50px' }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', mb: '20px' }}>
        <Box sx={{ pr: '50px' }}>
          {userImage === '' ? (
            <Avatar src="./defaultUserImage.png" alt="default user profile" sx={{ width: 80, height: 80 }} />
          ) : (
            <Avatar src={userImage} alt="user profile" sx={{ width: 80, height: 80 }} />
          )}
        </Box>
        <Box>
          <h4>
            {user.term}期生 {user.permission}
          </h4>
          <h3>{user.name}</h3>
        </Box>
      </Box>
      <CategoryTabs setKey={handleSetKey} />
      <MyPosts categoryKey={categoryKey} />
      <LikedPosts categoryKey={categoryKey} />
    </Box>
  );
};

export default Mypage;