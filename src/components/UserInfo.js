import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="text-red-400 text-sm  rounded-lg">
      <p className="font-bold">Name : {user?.displayName}</p>
      {/* <p>Email : {user?.email}</p> */}
      <button
        onClick={handleSignOut}
        className="font-bold bg-black p-2 rounded-md text-white"
      >
        (Sign Out)
      </button>
    </div>
  );
};
export default UserInfo;
