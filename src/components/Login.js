import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidateData(
      name?.current?.value,
      email?.current?.value,
      password?.current?.value,
      isSignInForm
    );
    setErrMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, displayName, photoURL, email } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrMessage("User not found");
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img src={BACKGROUND_IMG} alt="background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="text-3xl font-bold py-2 mx-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address or Phone Number"
          className="p-2 m-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 w-full bg-gray-700"
        />
        <p className="text-red-900 m-2 font-bold">{errMessage}</p>
        <button
          className="bg-red-700 w-full py-4 m-2 rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 ml-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
