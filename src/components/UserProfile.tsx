import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { deleteUser, logout } from "../API/auth";
import { toast } from "react-toastify";
import ConfirmDeleteToast from "./ConfirmDeleteToast";
import Cookies from "js-cookie";

interface User {
  username: string;
  logout: () => {};
  delete: () => {};
}

const UserProfile: FC<User> = ({ username }) => {
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Cookies.remove('username', {path: "/"})
    navigate("/login");
  };

  const handleDelete = () => {

    const cb = () => {
      deleteUser()
      toast.success('Account Deleted')
      navigate("/signup");
    }

    toast(<ConfirmDeleteToast cb={cb} />,{
      autoClose: false  
    })
  };

  return (
    <div
      onClick={() => { setShowDisplayMenu((prev) => !prev) }}
      className="group relative z-20 "
    >
      <div className="sm:flex gap-2 items-center">
        <div
          className={`rounded-full`}
        >
          <img src={`https://avatar.iran.liara.run/username?username=${username}`} alt="Profile Picture" 
            className="h-8"
          />
        </div>
        <p className="mb-1 hidden sm:block">{username}</p>
      </div>
      <div
        className={`${
          !showDisplayMenu && `hidden`
        } sm:group-hover:block absolute text-black rounded-lg right-0 min-w-28 sm:min-w-40`}
      >
        <div className="bg-transparent h-3"></div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xl pb-1 mb-2 border-b-2 border-black/20">
            {username}
          </p>
          <button onClick={handleLogout} className="mb-1">
            Logout
          </button>
          <button onClick={handleDelete} className="text-red-500 block text-nowrap">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
