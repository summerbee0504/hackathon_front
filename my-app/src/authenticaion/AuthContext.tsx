import React, { createContext, useEffect, useState } from 'react';
import { auth } from './Firebase';
import { User } from 'firebase/auth';

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
      setLoading(false);
      setIsSignedIn(!!user);
    });
  }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     setIsSignedIn(true);
  //   } else {
  //     setIsSignedIn(false);
  //   }
  // }, [currentUser]);

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
