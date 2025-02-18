import { useEffect, useState } from "react";
import Input from "./Input";
import { Data } from "../constants";
import { createData, updateData } from "../API/data";
import { useDispatch } from "react-redux";
import { addOne, updateDataContext } from "../context/features/dataSlice";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddDataForm = ({
  data,
  setIsAddData,
  setUpdate,
}: {
  data: Data | null;
  setIsAddData: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<Data | null>>;
}) => {
  const [site, setSite] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [others, setOther] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setEmail(data.email);
      setPassword(data.password);
      setUsername(data.username);
      setSite(data.site);
      if (data.others) setOther(data.others);
    }

    return  () => {
      setEmail("");
      setPassword("");
      setUsername('');
      setSite('');
      setOther('')
    }
  }, [data]);

  const handleClick = async () => {
    let newData = {
      _id: "",
      site,
      password,
      username,
      email,
      others,
    };

    if (data && data._id) {
      newData._id = data?._id;

      const res = await updateData(newData);
      if (res.status && res.data) {
        dispatch(updateDataContext(res.data));
        toast.success("Data updated successfully");
        setIsAddData(false);
      } else {
        toast.error(res.message);
        if (res.message === "UNAUTHORIZED") {
          toast.error("UNAUTHORIZED please login");
          setIsAddData(false);
          navigate("/login");
        }
      }
    } else {
      const res = await createData(newData);
      if (res.status && res.data) {
        dispatch(addOne(res.data));
        toast.success("Data created successfully");
        setIsAddData(false);
      } else {
        if (res.message === "UNAUTHORIZED") {
          toast.error("UNAUTHORIZED please login");
          setIsAddData(false);
          navigate("/login");
        }
      }
    }
    setUpdate(null)
  };

  return (
    <div 
      onClick={e => { e.stopPropagation() }}
    className="absolute right-4 sm:right-10 top-32 sm:top-36 flex flex-col space-y-2 bg-white p-5 rounded-lg z-30">
      <Input
        type="text"
        placeholder="Site Name"
        value={site}
        setValue={setSite}
        className=""
      />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        setValue={setUsername}
        className=""
      />
      <Input
        type="text"
        placeholder="Email"
        value={email}
        setValue={setEmail}
        className=""
      />
      <Input
        type="text"
        placeholder="Password"
        value={password}
        setValue={setPassword}
        className=""
      />
      <textarea
        name="other"
        id=""
        placeholder="Other info"
        className="bg-gray-100/70 px-4 py-2 text-black"
        value={others}
        onChange={(e) => setOther(e.target.value)}
      ></textarea>

      <button
        className="font-semibold bg-black py-2 rounded-md "
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default AddDataForm;
