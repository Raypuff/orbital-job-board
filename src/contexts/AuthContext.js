import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { store } from "../firebase";
import { authObject } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userVerified, setUserVerified] = useState(false);
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

  async function correctDomain(email, type) {
    try {
      const ref = store.collection("accounts").doc(email);
      const doc = await ref.get();
      if (doc.exists) {
        return doc.data().type === type;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function login(email, password, type) {
    if (await correctDomain(email, type)) {
      return auth.signInWithEmailAndPassword(email, password);
    } else {
      throw new Error("wrong-account-type");
    }
  }

  async function resetPassword(email, type) {
    if (await correctDomain(email, type)) {
      return auth.sendPasswordResetEmail(email);
    } else {
      throw new Error("wrong-account-type");
    }
  }

  function logout() {
    return auth.signOut();
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

  async function reauthenticate(oldPassword) {
    const credential = authObject.EmailAuthProvider.credential(
      currentUser.email,
      oldPassword
    );
    await auth.currentUser
      .reauthenticateWithCredential(credential)
      .catch((error) => {
        throw new Error("auth/wrong-password");
      });
  }

  async function changePassword(newPassword) {
    await currentUser.updatePassword(newPassword).catch((error) => {
      throw new Error("internal-error");
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user !== null) {
        getUserType(user.email);
        setUserVerified(user.emailVerified);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userType,
    userVerified,
    login,
    signup,
    logout,
    resetPassword,
    sendEmailVerification,
    reauthenticate,
    changePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
