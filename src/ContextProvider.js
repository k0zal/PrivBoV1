import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  query,
  getDocs,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Context = React.createContext();

function ContextProvider({ children }) {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  };


  
  // init firebase app
  initializeApp(firebaseConfig);

  // init services (the db)
  const db = getFirestore();
  const auth = getAuth();
  

  // ALL STATE MANAGERS
  const [currentUserId, setCurrentUserId] = useState();
  const [errMessage, setErrmessage] = useState("");
  const [successLogin, setSuccessLogin] = useState("");
  const [userData, setUserData] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [userMessages, setUserMessages] = useState([])
  const [loggedState, setLoggedState] = useState();
  const [searchArea, setSearchArea] = useState("");
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [signedInUser, setSignedInUser] = useState("")

  // used to sort by newest date
  const collectionRef = collection(db, "ads");
  const usersRef = collection(db, "users");
  const messagesRef = collection(db, "messages")



  const myCol = collection(db, "users", "posts", "hTCKb7exm7uJnrvYzKhB");
  const myDOc = doc(db, "users", "posts", "hTCKb7exm7uJnrvYzKhB", "testish");

  const quez = query(collectionRef, where("lookingInArea", "==", "Mölndal"));

  const [testUser, setTestUser] = useState("")
  const getUser = query(usersRef, where("id", "==", testUser))

 
  // Query to sort by date added.
  const que = query(collectionRef, orderBy("createdAt", "desc"));

  // Function to create an account in the firebase database
  async function createAccount(
    e,
    userEmail,
    userPassword,
    firstName,
    lastName,
    age
  ) {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      await addDoc(usersRef, {
        firstName,
        lastName,
        age,
        email: userEmail,
        id: user.uid,
      });
      {
        user.email && setCheckUserMail(user.email);
      }
      console.log("Konto Registrerat!");
      // add the console log to state message for render ( REMINDER )
    } catch (err) {
      console.log(err.message);
      setErrmessage(err.message);
    }
  }

  // Search for city function
  function citySearchFunction(cityInput) {
    let filtered;

    const upperCaseLetter =
      cityInput.charAt(0).toUpperCase() + cityInput.slice(1);
    const lowerCaseAllExceptFirst = upperCaseLetter.replace(
      /\S*/g,
      function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      }
    );
    if (typeof cityInput === "string" && cityInput !== "") {
      filtered = filteredData.filter((data) => {
        return data.lookingInArea === lowerCaseAllExceptFirst;
      });
      
      setFilteredData(filtered);
      sessionStorage.setItem("filteredCity", JSON.stringify(cityInput))
      console.log("new city search data", filteredData);
    }
    // else{
    //   fetchDb()
    // }
  }

  // Filter by smoking function
  function smokingFilter(){}
  
  // Remove ad from database function
  function removeAd(idOfAd){
    const docRef = doc(db, "ads", idOfAd)

    deleteDoc(docRef).then(() => {
      console.log("Annons borttagen!")
    })

  }

useEffect(() => {
  if(testUser){
    getDocs(getUser)
    .then((snapshot) => {
      let info = []
      snapshot.docs.forEach((doc) => {
        info.push({...doc.data(), id: doc.id})
      })
      setUserAccounts(info)
      // console.log("solo query test", userAccounts)
    })
  }
}, [testUser])




  // Login function to set credentials
  function login(e, userEmail, userPassword) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((cred) => {
        console.log("user logged in: ", cred.user);
        const newState = true;
        setSuccessLogin("Inloggning verifierad.");
        setTimeout(() => {
          setLoggedState(newState);
          setIsLoading(true)
        }, 2000);
        localStorage.setItem("logged", JSON.stringify(newState));
      })
      .catch((err) => {
        const errorMessage = err.message;
        // console.log(errorMessage);
        setErrorMessage(errorMessage);
      });
  }

  // Signing out, clearing credentials
  function logout() {
    
    setTimeout(() => {
      signOut(auth)
      .then(() => {
        // console.log("user signed out");
        const newState = false;
        setLoggedState(newState);
        
        localStorage.setItem("logged", JSON.stringify(newState));
      })
      .catch((err) => {
        console.log(err.message);
      });

    }, 1000);
    
  }

  // console.log("Isloading är just nu: ", signedInUser)

  // Function to fetch the database on page load
  function fetchDb() {
    onSnapshot(que, (snapshot) => {
      const ads = [];
      snapshot.docs.map((data) => {
        ads.push({ ...data.data(), id: data.id });
      });
      setUserData(ads);
      setFilteredData(ads)
    });
  }

  useEffect(() => {
    fetchDb()
    sessionStorage.removeItem("filteredState")
    
  }, []);

  

  // State handlers
  const [loggedIn, setIsLoggedIn] = useState(true);
  const [checkUserMail, setCheckUserMail] = useState();
  const [checkFirstName, setCheckFirstName] = useState()
  const [errorMessage, setErrorMessage] = useState();


useEffect(() => {
  if(testUser){
    getDocs(getUser)
    .then((snapshot) => {
      let info = []
      snapshot.docs.forEach((doc) => {
        info.push({...doc.data(), id: doc.id})
      })
      setUserAccounts(info)
      
    })
  }

}, [])



  
  // Run a useEffect to check after changes in the database like if an new ad is posted or removed
  useEffect(() => {
    // onSnapshot(getUser, (snapshot) => {
    //   const users = [];
    //   snapshot.docs.map((data) => {
    //     users.push({ ...data.data(), id: data.id });
    //   });
    //   setUserAccounts(users);
      
    // });
    



    


    onSnapshot(messagesRef, (snapshot) => {
      const messages = [];
      snapshot.docs.map((data) => {
        messages.push({ ...data.data(), id: data.id });
      });

      setUserMessages(messages);
    });
    // Run a useeffect to check after new messages in the database

    // Keeping track of the signed in users credentials in real time to track changes like signing out
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const setLocal = true;
        const uid = user.uid;
        setSignedInUser(user)
        setTestUser(uid)
        setLoggedState(setLocal);
        {
          uid !== undefined && setCurrentUserId(uid);
        }
        localStorage.setItem("logged", JSON.stringify(setLocal));
        console.log(uid, "signed in");
        {
          user.email && setCheckUserMail(user.email);
        }
        
      } else {
        console.log("user is signed out");
        const setLocal = false;
        setLoggedState(false);
        setSignedInUser(null)
        setIsLoading(true)
        setTestUser("")
        localStorage.setItem("logged", JSON.stringify(setLocal));
        setCheckUserMail(null);
      }
    });
  }, []);

  //Modal handler

  const [modalState, setModalState] = useState(false)



  return (
    <Context.Provider
      value={{
        userData,
        setUserData,

        addDoc,
        collectionRef,
        onSnapshot,
        // fetchInitialData,
        serverTimestamp,
        createUserWithEmailAndPassword,
        auth,
        createAccount,
        logout,
        login,
        signOut,
        errorMessage,
        loggedState,
        userAccounts,
        checkUserMail,
        errMessage,
        successLogin,
        citySearchFunction,
        setSearchArea,
        searchArea,
        fetchDb,
        checkFirstName,
        removeAd,
        filteredData,
        setFilteredData,
        isLoading,
        modalState,
        setModalState,
        messagesRef,
        userMessages
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
