import  { FC, useState } from "react";
import { Data } from "../constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "../API/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteOne } from "../context/features/dataSlice";
import { IoInformationCircleOutline } from "react-icons/io5";


interface DataProps {
  data: Data;
  setIsAddData: React.Dispatch<React.SetStateAction<boolean>>
  setUpdate: React.Dispatch<React.SetStateAction<Data | null>>
}

const DataCard: FC<DataProps> = ({ data, setIsAddData, setUpdate }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showOther, setShowOther] = useState(false)

    const handleUpdate = () => {
        setUpdate(data)
        setIsAddData(true)
    }

    const handleDelete = async() => {
      if(!(data && data._id))return
        const res = await deleteData(data._id)
      
        if(res){
          toast.success('Data deleted successfully')
          dispatch(deleteOne(data._id))
        } 
        else {
      toast.error('Unauthorized')
      navigate('login')
    }}

  return (
    <div
      key={data._id}
    className="h-fit p-3 flex-1 text-black rounded-xl hover:shadow-lg shadow-violet-400 bg-gradient-to-tr from-white via-pink-100 to-purple-400 sm:w-full">
      <div>
        <p className="text-2xl mb-3 max-w-[20ch] sm:max-w-[25ch] overflow-scroll">{data.site}</p>
      </div>

      <div className="p-3 space-y-2 border border-black rounded-xl">
        <ul className="space-y-2">
            <li>
              <p className="text-xs">Username</p>
              <p className="text-lg max-w-[30ch] break-words">{data.username}</p>
            </li>
            <li>
              <p className="text-xs">email</p>
              <p className="text-lg max-w-[30ch] break-words">{data.email}</p>
            </li>

          <li>
            <p className="text-xs">Password</p>
            <p className="text-lg max-w-[30ch] break-words">{data.password}</p>
          </li>

        </ul>
            <div className="flex justify-between">
              <div className="reletive group space-y-2">
                <p 
                  onClick={() => setShowOther(prev => !prev)}
                className="text-xl">{<IoInformationCircleOutline />}</p>

                    <div className="absolute  hidden max-w-80 break-words group-hover:block text-black bg-white px-2 y-3 rounded-lg border border-black">{data.others || 'No info'}</div>

                {
                  showOther && (
                    <div className="absolute   max-w-80 break-words  text-black bg-white px-2 y-3 rounded-lg border border-black">{data.others || 'No info'}</div>
                  )
                }

                </div>
                <div className=" space-x-2 flex items-center">


                <button 
                onClick={handleUpdate}
                className="border-2 border-black text-sm px-2 h-6 rounded-md">Edit</button>
                <button 
                onClick={handleDelete}
                className="border-2 border-black text-sm px-3 h-6 rounded-md"><RiDeleteBin6Line /></button>
                                </div>
            </div>
      </div>
    </div>
  );
};

export default DataCard;
