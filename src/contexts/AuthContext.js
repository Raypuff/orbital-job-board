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
  const [token, setToken] = useState();

  async function signup(email, password, accountType) {
    try {
      //creating account on firebase
      await auth.createUserWithEmailAndPassword(email, password);

      //changing user role for frontend
      const ref = store.collection("accounts");
      const accountObject = { type: accountType };
      await ref
        .doc(email)
        .set(accountObject)
        .catch((err) => {
          console.error(err);
        });

      //changing user role in backend
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/firebase/create-${accountType}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        }
      );
    } catch (err) {
      throw err;
    }
    return;
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
    return auth.currentUser.sendEmailVerification().catch((error) => {
      throw new Error("auth/too-many-requests");
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

  function getUserType(email) {
    const ref = store.collection("accounts").doc(email);
    setLoading(true);
    ref.onSnapshot((docSnapshot) => {
      setUserType(docSnapshot.data().type);
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserType(user.email);
        setUserVerified(user.emailVerified);
        user
          .getIdToken()
          .then((newToken) => setToken(newToken))
          .catch((error) => console.log(error));
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
    token,
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
