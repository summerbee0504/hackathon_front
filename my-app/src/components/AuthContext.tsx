import React, { createContext, useEffect, useState } from 'react';
import { auth } from './Firebase';
import { User } from 'firebase/auth';

interface IAuthContext {
  currentUser: User | null | undefined;
  isSignedIn: boolean;
}

const AuthContext = createContext<IAuthContext>({
  currentUser: undefined,
  isSignedIn: false
});

interface UserAdditionalInfo {
  id: string;
  name: string;
  term: number;
  bio: string;
  permission: string;
}

const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isSignedIn: isSignedIn
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
