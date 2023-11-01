import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyA61JtjAgZN9pMSqdCcfqQuVvRBY7GefWk',
//   authDomain: 'term4-yuria-fujii.firebaseapp.com',
//   projectId: 'term4-yuria-fujii',
//   storageBucket: 'term4-yuria-fujii.appspot.com',
//   messagingSenderId: '129982847412',
//   appId: '1:129982847412:web:c41b3edab567047d8abae1'
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
