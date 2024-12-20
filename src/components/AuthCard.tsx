import { FC, useState } from "react";

import loginIcon from "../assets/login.png";
import { Link } from "react-router";
import Input from "./Input";
import { toast } from "react-toastify";

type auth = "Sign Up" | "Login";

interface AuthType {
  type: auth;
  handleSubmit: (Username: string, passwords: string) => Promise<void>
}

const AuthCard: FC<AuthType> = ({ type, handleSubmit }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleForgetPassword = () => {
      toast(<div>
        Contact on <a
          href="mailto:ankityadav11241@gamil.com"
        className="text-blue-500 cursor-pointer">ankityadav11241@gamil.com</a>
      </div>, {
        autoClose: false
      })
    }

  return (
    <form className="absolute bg-white/40 shadow-lg max-w-80 sm:max-w-96 bg-white text-black h-fit space-y-5 p-4 py-8 sm:p-8 rounded-xl">
      <div className="flex place-content-center">
        <img src={loginIcon} alt="" className="h-10" />
      </div>
      <div className="text-center">
      <h1
       className="text-xl sm:text-2xl font-semibold"
      >{`${type} with Username`}</h1>
      <p
        className="text-gray-800"
      >{`Secure your passwords, simplify your life ${type} now!`}</p>
      </div>

      <div 
      className="flex flex-col gap-2"
      >
        <Input type="text" placeholder="Username" className="" value={username} setValue={setUsername}/>
        <Input type="Password" placeholder="Password" className="" value={password} setValue={setPassword}/>
      {
        type === 'Login' && (
            <div className="text-end">
                <button
                    onClick={handleForgetPassword}
                    className="text-black font-semibold text-sm"
                >Forget Password ?</button>
            </div>
        )
      }
      </div>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          handleSubmit(username, password)}}
        className="text-center w-full bg-black text-white py-2 rounded-lg mt-2"
      >{`${type}`}</button>
       {
        type === 'Login' ? (
            <div className="text-center">
                <p
                    className="text-black font-semibold"
                >Don't have an account? &nbsp;
                <Link to='/signup'
                    className="hover:text-blue-500"
                >Sign Up</Link></p>
            </div>
        ) : (
            <div className="text-center">
            <p
                className="text-black font-semibold"
            >Already have an account? &nbsp;
            <Link to='/login'
                                className="hover:text-blue-500"
            >Login</Link></p>
        </div>
        )
      }
    </form>
  );
};

export default AuthCard;
