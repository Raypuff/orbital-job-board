import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { store } from "../firebase";

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

  //test if user is signing in from correct place
  async function tempTester(email) {
    try {
      const ref = store.collection("accounts").doc(email);
      const doc = await ref.get();
      if (doc.exists) {
        return doc.data().type;
      }
    } catch (err) {
      console.error(err);
    }
  }

  //deprecated - login from anywhere function
  /*
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  */

  async function loginAdmin(email, password) {
    const accType = await tempTester(email);

    if (accType === "admin") {
      return auth.signInWithEmailAndPassword(email, password);
    } else {
      throw new Error("wrong-account-type");
    }
  }

  async function loginStu(email, password) {
    const accType = await tempTester(email);

    if (accType === "student") {
      return auth.signInWithEmailAndPassword(email, password);
    } else {
      throw new Error("wrong-account-type");
    }
  }

  async function loginOrg(email, password) {
    const accType = await tempTester(email);

    if (accType === "organization") {
      return auth.signInWithEmailAndPassword(email, password);
    } else {
      throw new Error("wrong-account-type");
    }
  }

  async function resetPasswordOrg(email) {
    const accType = await tempTester(email);
    if (accType === "organization") {
      return auth.sendPasswordResetEmail(email);
    } else {
      throw new Error("wrong-account-type");
    }
  }

  async function resetPasswordStu(email) {
    const accType = await tempTester(email);
    if (accType === "student") {
      return auth.sendPasswordResetEmail(email);
    } else {
      throw new Error("wrong-account-type");
    }
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
    loginStu,
    loginOrg,
    loginAdmin,
    signup,
    logout,
    resetPassword,
    resetPasswordOrg,
    resetPasswordStu,
    sendEmailVerification,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
