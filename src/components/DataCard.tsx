import { FC, useEffect, useState } from "react";
import { Data } from "../constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "../API/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteOne } from "../context/features/dataSlice";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import ConfirmDeleteToast from "./ConfirmDeleteToast";
import { FiEdit } from "react-icons/fi";

interface DataProps {
  data: Data;
  setIsAddData: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<Data | null>>;
}

const DisplayOnHover = ({ content }: { content: string }) => {

  const handleCopy = (text: string) => {
    window.navigator.clipboard.writeText(text);
    toast(`Copid ${text}`, {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  return (
    <div
    onClick={() => handleCopy(content)}
    className="absolute max-w-72 text-wrap break-words hidden sm:group-hover:block text-black bg-white/50 backdrop-blur-lg backdrop-filter px-2 y-3 rounded-lg border border-blue-400 z-10">
      {content}
    </div>
  );
};

const DataCard: FC<DataProps> = ({ data, setIsAddData, setUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOther, setShowOther] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return setUpdate(null)
  },[])

  const handleUpdate = () => {
    setUpdate(data);
    setIsAddData(prev => !prev);
  };

  const handleDelete = () => {
    if (!(data && data._id)) return;
    const id = data._id

    const cb = async(id: string) => {
      
      const res = await deleteData(id);
      
      if (res) {
        toast.success("Data deleted successfully");
        dispatch(deleteOne(id));
      } else {
        toast.error("Unauthorized");
        navigate("login");
      } 
    }
    
  toast(<ConfirmDeleteToast cb={() => cb(id)} />,{
    autoClose: false  
  })
  };

  const handleCopy = (text: string) => {
    window.navigator.clipboard.writeText(text);
    toast(`Copid ${text}`, {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  return (
    <div
      key={data._id}
      className="h-fit p-3 flex-1 text-black rounded-xl hover:shadow-lg shadow-violet-400 bg-gradient-to-tr from-white via-pink-100 to-purple-400 "
      style={{
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
      }}
    >
      <div className="relative group">
        <p
          onClick={() => handleCopy(data.site)}
          className="text-2xl mb-3 max-w-[23ch] sm:max-w-[25ch] break-words sm:truncate"
        >
          {data.site}
        </p>
        <DisplayOnHover content={data.site} />
      </div>

      <div className="p-3 space-y-2 border border-black rounded-xl ">
        <ul className="space-y-2">
          <li className="relative group">
            <p className="text-xs ">Username</p>
            <p
              onClick={() => handleCopy(data.username)}
              className="text-lg max-w-[28ch] sm:max-w-[35ch] break-words sm:truncate"
            >
              {data.username}
            </p>
            <DisplayOnHover content={data.username} />
          </li>
          <li className="relative group">
            <p className="text-xs">email</p>
            <p
              onClick={() => handleCopy(data.email)}
              className="text-lg max-w-[28ch] sm:max-w-[35ch] break-words sm:truncate"
            >
              {data.email}
            </p>
            <DisplayOnHover content={data.email} />
          </li>
          <li className="relative group">
            <p className="text-xs">Password</p>
            <div className="flex justify-between">
              <p
                onClick={() => {
                  showPassword && handleCopy(data.username);
                }}
                className="text-lg max-w-[25ch] sm:max-w-[28ch] break-words sm:truncate"
              >
                {showPassword ? data.password : "********"}
              </p>
              {showPassword && <DisplayOnHover content={data.password} />}

              <button
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </li>
        </ul>
        <div className="flex justify-between">
          <div className="reletive group space-y-2">
            <p
            onClick={() => {
              setShowOther((prev) => !prev)
              data.others && handleCopy(data.others)
            }}
              className="text-xl"
            >
              {<IoInformationCircleOutline />}
            </p>

            <div
              className={`absolute max-w-80 text-wrap break-words hidden sm:group-hover:block text-black bg-white/50 backdrop-blur-lg backdrop-filter px-2  rounded-lg border border-blue-400 `}
            >
              {data.others || "No info"}
            </div>

            {showOther && (
              <div
                className={`absolute max-w-80 text-wrap break-words text-black bg-white/50 backdrop-blur-lg backdrop-filter px-2  rounded-lg border border-blue-400 `}
              >
                {data.others || "No info"}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center text-lg ">
            <button
              onClick={handleUpdate}
              className="hover:text-xl "
            >
              <FiEdit />
            </button>
            <button
              onClick={handleDelete}
              className="hover:text-xl hover:text-red-600 pl-1 hover:px-px"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
