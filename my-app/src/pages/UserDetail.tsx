import React, { useContext, useState } from 'react';
import '../styles/UserDetail.css';
import { AuthContext } from '../components/AuthContext';
import { Avatar } from '@mui/material';
import UserUpdateForm from '../components/UserUpdateForm';
import { useGetRequest } from '../components/useGetRequest';
import LikedPosts from '../components/LikedPosts';
import CategoryTabs from '../components/CategoryTabs';

interface user {
  id: string;
  name: string;
  term: number;
  bio: string;
  permission: string;
}

const UserDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const userImage = currentUser?.photoURL || '';
  const url = 'http://localhost:8080/user?id=' + currentUser?.uid;
  const { data } = useGetRequest(url);
  let user: user | undefined;
  if (data.length !== 0) {
    user = data[0];
  }
  const [categoryKey, setCategoryKey] = useState(1);
  const handleSetKey = (newKey: number) => {
    setCategoryKey(newKey);
  };

  return (
    <div className="Userdetail">
      {userImage === '' ? (
        <Avatar src="./defaultUserImage.png" alt="default user profile" sx={{ width: 150, height: 150 }} />
      ) : (
        <Avatar src={userImage} alt="user profile" sx={{ width: 150, height: 150 }} />
      )}
      <h1>Hello, {user !== undefined && user.name} :)</h1>
      <UserUpdateForm />
      <CategoryTabs setKey={handleSetKey} />
      <LikedPosts categoryKey={categoryKey} />
    </div>
  );
};

export default UserDetail;
