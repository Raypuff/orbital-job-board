import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCCnYK0KUEuGRwXGL4KZsc78Z0ACkIJTgM",
  authDomain: "nus-orbital-development.firebaseapp.com",
  projectId: "nus-orbital-development",
  storageBucket: "nus-orbital-development.appspot.com",
  messagingSenderId: "395419282206",
  appId: "1:395419282206:web:5451d1ed6655ea4318370f"
});

export const auth = app.auth();
export default app;