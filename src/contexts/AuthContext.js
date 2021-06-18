import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { store } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState();

  function signup(email, password, accountType) {
    const ref = store.collection("accounts");
    const accountObject = { type: accountType };
    ref
      .doc(email)
      .set(accountObject)
      .catch((err) => {
        console.error(err);
      });
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function sendEmailVerification() {
    return auth.currentUser.sendEmailVerification();
  }

  function getUserType(email) {
    const ref = store.collection("accounts").doc(email);
    setLoading(true);
    ref.onSnapshot((docSnapshot) => {
      setUserType(docSnapshot.data().type);
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user !== null) {
        getUserType(user.email);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userType,
    login,
    signup,
    logout,
    resetPassword,
    sendEmailVerification,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
