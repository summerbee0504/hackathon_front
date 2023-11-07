import React, { useContext } from 'react';
import '../styles/Signup.css';
import SignupForm from '../components/SignupForm';
import { AuthContext } from '../components/AuthContext';
import { Avatar } from '@mui/material';

const Signup = () => {
  const { currentUser } = useContext(AuthContext);
  const userImage = currentUser?.photoURL || '';

  return (
    <div className="Signup">
      {userImage === '' ? (
        <Avatar src="./defaultUserImage.png" alt="default user profile" sx={{ width: 150, height: 150 }} />
      ) : (
        <Avatar src={userImage} alt="user profile" sx={{ width: 150, height: 150 }} />
      )}
      <h1>Hello, new user :)</h1>
      <h2>Tell me a bit more about yourself!</h2>
      <SignupForm />
    </div>
  );
};

export default Signup;
