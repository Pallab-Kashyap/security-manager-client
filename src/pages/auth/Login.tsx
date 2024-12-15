

import AuthCard from '../../components/AuthCard'
import { login } from '../../API/auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../../context/features/userSlice'
import { useNavigate } from 'react-router'
import background from '../../assets/cloudebackground.jpg'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async(Username: string, passwords: string) => {
    const res = await login(Username, passwords)
    console.log(res);
    if(res.status){
      dispatch(addUser(res))
      navigate('/')
    }
    else toast.error(res.message)
  }

  return (
    <>
    <div className='flex justify-center items-center min-h-screen'>
      <ToastContainer 
       autoClose={3000}
       position="top-right"

     />
      <img src={background} alt=""
        className='h-screen w-full  object-cover'
      />
      <AuthCard type='login' handleSubmit={handleSubmit}/>
    </div>
    </>
  )
}

export default Login