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
  orderBy,
  startAt,
  endAt,
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
    const { email, firstName, lastName, gender, hobbies, type, salary, city } =
      data;

    const uid = user.user.uid;

    await setDoc(doc(firestore, `users`, `${user?.user.uid}`), {
      email,
      firstName,
      lastName,
      gender,
      hobbies,
      uid,
      type,
      salary,
      city,
      department: "",
      createdAt: new Date(),
    }).then((res) => alert("Account Created"));
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
  const getAllData = async () => {
    const q = query(
      collection(firestore, "users"),
      where("type", "==", "employee")
    );
    const docs = await getDocs(q);
    return docs.docs;
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
  //!Different Queryies Function
  const handleITSURATQuery = async () => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("city", "==", "Surat"),
        where("department", "==", "IT"),
        where("type", "==", "employee")
      );
      const docs = await getDocs(q);
      const data = docs.docs;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleEmployeeSales = async () => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("department", "==", "Sales"),
        where("type", "==", "employee")
      );
      const docs = await getDocs(q);
      const data = docs.docs;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleMaxSalaryHR = async () => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("type", "==", "employee"),
        where("department", "==", "HR"),
        orderBy("salary", "desc")
      );
      const docs = await getDocs(q);
      const data = docs.docs;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleMinSalaryHR = async () => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("department", "==", "IT"),
        where("type", "==", "employee"),
        orderBy("salary")
      );
      const docs = await getDocs(q);
      const data = docs.docs;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleCityWithA = async () => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("type", "==", "employee"),
        orderBy("city"),
        startAt("A" || "a")
      );
      const docs = await getDocs(q);
      const data = docs.docs;
      console.log(docs);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  // Function to Handle the Query From Manager
  const handleQueryManager = async (value) => {
    if (value == "1") {
      const res = await handleMaxSalaryHR();
      return res;
    }
    if (value == "2") {
      const res = await handleMinSalaryHR();
      return res;
    } else if (value == "3") {
      const res = await handleITSURATQuery();
      return res;
    } else if (value == "4") {
      const res = await handleCityWithA();
      return res;
    } else if (value == "5") {
      const res = await handleEmployeeSales();
      return res;
    } else if (value == "6") {
      const res = await getAllData();
      return res;
    } else {
      return [];
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
        handleQueryManager,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
