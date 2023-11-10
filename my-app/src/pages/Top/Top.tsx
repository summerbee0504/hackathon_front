import React from 'react';
import '../../styles/Top.css';
import LoginForm from './components/LoginForm';

const Top: React.FC = () => {
  return (
    <div className="Top">
      <div className="App-image-container">
        <img className="App-logo" src="./Logowithname.png" alt="logo" />
      </div>
      <LoginForm />
    </div>
  );
};

export default Top;
