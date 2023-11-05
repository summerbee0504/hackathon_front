import React, { useContext } from 'react';
import '../styles/Signup.css';
import { AuthContext } from '../components/AuthContext';
import { Avatar } from '@mui/material';
import UserUpdateForm from '../components/UserUpdateForm';

const UserDetail = () => {
  const { currentUser, userAdditionalInfo } = useContext(AuthContext);
  const userImage = currentUser?.photoURL || '';

  return (
    <div className="Signup">
      {userImage === '' ? (
        <Avatar src="./defaultUserImage.png" alt="default user profile" sx={{ width: 150, height: 150 }} />
      ) : (
        <Avatar src={userImage} alt="user profile" sx={{ width: 150, height: 150 }} />
      )}
      <h1>Hello, {userAdditionalInfo?.name} :)</h1>
      <UserUpdateForm />
    </div>
  );
};

export default UserDetail;
