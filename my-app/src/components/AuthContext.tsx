import React, { createContext, useEffect, useState } from 'react';
import { auth } from './Firebase';
import { User } from 'firebase/auth';

interface IAuthContext {
  currentUser: User | null | undefined;
  userAdditionalInfo: UserAdditionalInfo | undefined;
  isSignedIn: boolean;
}

const AuthContext = createContext<IAuthContext>({
  currentUser: undefined,
  userAdditionalInfo: undefined,
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
  const [userAdditionalInfo, setUserAdditionalInfo] = useState<UserAdditionalInfo | undefined>(undefined);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const url = `http://localhost:8080/user?id=${currentUser.uid}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setUserAdditionalInfo(data);
          setIsSignedIn(true);
        });
    } else {
      setUserAdditionalInfo(undefined);
      setIsSignedIn(false);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        userAdditionalInfo: userAdditionalInfo,
        isSignedIn: isSignedIn
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
