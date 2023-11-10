import { signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth, provider } from '../../../authenticaion/Firebase';
import { useNavigate } from 'react-router-dom';
import '../../../styles/LoginForm.css';
import GoogleButton from './GoogleButton';

const LoginForm = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        if (isNewUser) {
          navigate('/signup');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="Button">
      <GoogleButton onClick={handleClick} />
    </div>
  );
};

export default LoginForm;
