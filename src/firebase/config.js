import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// import { createUserDocument } from "firebase/database";
const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRHjOYFdIugA4YH4D_moSW9wvIpiC_Ffw",
  authDomain: "managment-276b9.firebaseapp.com",
  projectId: "managment-276b9",
  storageBucket: "managment-276b9.appspot.com",
  messagingSenderId: "992081147549",
  appId: "1:992081147549:web:8332c707634fb598d5c674",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
//! Creating custom hook
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  // Function to save Other Data While SignUp
  const Navigate = useNavigate();
  const [type, setType] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      console.log("hello");
      if (user) {
        setLoggedIn(user);
        setIsLoggedIn(true);
      } else {
        setLoggedIn(null);
        setIsLoggedIn(false);
        setType(null);
      }
    });
  }, []);
  const createUserDocument = async (user, data) => {
    if (!user) return;
    const { email } = data;
    const { firstName } = data;
    const { lastName } = data;
    const { gender } = data;
    const { hobbies } = data;
    const { type } = data;
    const uid = user.user.uid;

    await setDoc(doc(firestore, `users`, `${user?.user.uid}`), {
      email,
      firstName,
      lastName,
      gender,
      hobbies,
      uid,
      type,
      department: "",
      createdAt: new Date(),
    });
  };

  // Function to SignUp
  const signUpWithEmailAndPassword = async (data) => {
    await createUserWithEmailAndPassword(
      FirebaseAuth,
      data.email,
      data.password
    )
      .then((res) => {
        createUserDocument(res, data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // Sign in Employee and Manager

  const signInWithEmailAndPass = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(
        FirebaseAuth,
        data.email,
        data.password
      );
      const uid = res.user.uid;
      const q = query(collection(firestore, "users"), where("uid", "==", uid));
      const docs = await getDocs(q);
      const type = docs.docs[0].data().type;
      if (type) {
        setType(type);
        type === "manager" ? Navigate(`/${type}`) : Navigate(`/${type}/${uid}`);
      } else {
        return "No user Found";
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Function to get all employee Data
  const getAllData = () => {
    return getDocs(collection(firestore, "users"));
  };
  // Update the department
  const updateDepartment = async (data, department) => {
    const washingtonRef = doc(firestore, `users`, `${data.uid}`);
    await updateDoc(washingtonRef, {
      department: department,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  // Function to get Employee Data
  const getEmployeeData = async (uid) => {
    try {
      const q = query(collection(firestore, "users"), where("uid", "==", uid));
      const docs = await getDocs(q);
      const data = docs.docs[0].data();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  // Function to Logout
  const logOut = () => {
    signOut(FirebaseAuth);
  };
  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        getAllData,
        updateDepartment,
        signInWithEmailAndPass,
        type,
        LoggedIn,
        logOut,
        isLoggedIn,
        getEmployeeData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
