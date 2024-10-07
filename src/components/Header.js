import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

const Header = () => {
  const user = useSelector((store) => store.user);
  const [isUserInfo, setIsUserInfo] = useState(false);
  const handleUserToggle = () => {
    setIsUserInfo(!isUserInfo);
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
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
