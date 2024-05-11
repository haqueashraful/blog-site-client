import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import auth from "../Firebase/firebase.config";
import axios from "axios";

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
  
   
   
   
  useEffect(() => {
    setLoader(true);
    const loggedUser = {
      email: user?.email,
    };
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoader(true);
      setUser(currentUser);
      setStateLoader(false);
      setLoader(false);
      if (currentUser) {
               axios.post("http://localhost:5000/jwt", loggedUser, { withCredentials: true})
          .then((response) => {
            console.log(response.data)
          });
      } else {
        axios.post("http://localhost:5000/logout", loggedUser, { withCredentials: true })
          .then((response) => {
          })
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const handleAddToWishlist = (blog) => {
    // Implement functionality to add blog to wishlist
    console.log('Added to wishlist:', blog);
  };
  
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
      handleAddToWishlist,
    //   handleChange,
      isChecked,
      stateLoader,
      loader,
      user,
      load,
    };
  
  return <Context.Provider value={info}>{children}</Context.Provider>;
};

