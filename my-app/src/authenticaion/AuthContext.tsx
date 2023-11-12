import React, { createContext, useEffect, useState } from 'react';
import { auth } from './Firebase';
import { User } from 'firebase/auth';
import { CircularProgress } from '@mui/material';

interface IAuthContext {
  currentUser: User | null | undefined;
  isSignedIn: boolean;
  loading?: boolean;
}

const AuthContext = createContext<IAuthContext>({
  currentUser: undefined,
  isSignedIn: false,
  loading: true
});

const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsSignedIn(!!user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isSignedIn: isSignedIn,
        loading: loading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
