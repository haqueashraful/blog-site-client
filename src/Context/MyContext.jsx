import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import auth from "../Firebase/firebase.config";

export const Context = createContext();

export const MyContext = ({ children }) => {
    const [load, setLoad] = useState(false);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [stateLoader, setStateLoader] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
  
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
  
    const profileUpdate = (name, photo_url) => {
      setLoad(true);
      updateProfile(auth.currentUser, {
        displayName: name || user?.displayName,
        photoURL: photo_url || user?.photoURL,
      })
        .then(() => {})
        .catch((error) => {
          toast.error("Cannot update profile:", error.message);
        })
        .finally(() => {
          setLoad(false);
        });
    };
  
    const logInUser = (email, password) => {
      setLoader(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const registerUser = (email, password) => {
      setLoader(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInWithGoogle = () => {
      setLoader(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    const signInWithGitHub = () => {
      setLoader(true);
      return signInWithPopup(auth, gitHubProvider);
    };
    const logOutUser = () => {
      return signOut(auth)
        .then(() => {
          toast.success("Logout successfully");
          setUser(null);
        })
        .catch((error) => {
          toast.error("Error signing out:", error.message);
          throw error;
        })
        .finally(() => {
          setLoader(false);
        });
    };
  
    // const handleChange = () => {
    //   const newChecked = !isChecked;
    //   setIsChecked(newChecked);
    //   localStorage.setItem("isChecked", newChecked);
    // };
    
    // useEffect(() => {
    //   const storedChecked = localStorage.getItem("isChecked");
    //   if (storedChecked !== null) {
    //     setIsChecked(storedChecked === "true");
    //   }
    // }, []);
    
    // useEffect(() => {
    //   const newTheme = isChecked ? "light" : "sunset";
    //   document.documentElement.setAttribute("data-theme", newTheme);
    // }, [isChecked]);
    
   
    useEffect(() => {
      setLoader(true);
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setStateLoader(false);
        setLoader(false);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    const info = {
      setUser,
      logOutUser,
      logInUser,
      registerUser,
      profileUpdate,
      signInWithGoogle,
      signInWithGitHub,
      setLoad,
      setLoader,
      setStateLoader,
      setIsChecked,
    //   handleChange,
      isChecked,
      stateLoader,
      loader,
      user,
      load,
    };
  
  return <Context.Provider value={info}>{children}</Context.Provider>;
};

