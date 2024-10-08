import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  const [isUserInfo, setIsUserInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserToggle = () => {
    setIsUserInfo(!isUserInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in/up
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex">
          {isUserInfo && <UserInfo />}
          <div className="flex p-2 cursor-pointer" onClick={handleUserToggle}>
            <img className="w-12 h-12" src={user?.photoURL} alt="usericoon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
