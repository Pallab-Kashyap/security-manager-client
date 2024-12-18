import AuthCard from '../../components/AuthCard'
import { signup } from '../../API/auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../../context/features/userSlice'
import { useNavigate } from 'react-router'
import background from '../../assets/cloudebackground.jpg'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

  const handleSubmit = async(Username: string, passwords: string) => {
    const res = await signup(Username, passwords)

    if(res.message){
      dispatch(addUser(res))
      navigate('/')
    }
    else toast.error(res.message)
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
               <ToastContainer 
        autoClose={3000}
        position="top-right"
      />
            <img src={background} alt=""
        className='h-screen w-full  object-cover'
      />
      <AuthCard type='Sign Up' handleSubmit={handleSubmit}/>
    </div>
  )
}
  


export default Signup