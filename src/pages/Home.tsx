import { RootState } from "../context/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../API/data";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addData } from "../context/features/dataSlice";
import DataCard from "../components/DataCard";
import AddDataForm from "../components/AddDataForm";
import { Data } from "../constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";
import { MdLogout } from "react-icons/md";
import { logout } from "../API/auth";

const Home = () => {
  const data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState<Data | null>(null);
  const [isAddData, setIsAddData] = useState(false);
  const [searchResults, setSearchResults] = useState(data);

  useEffect(() => {

    (async () => {
      if (!data || data.length === 0) {
        const res = await getData();
        if(!res) navigate('/login')
          
        if (res && Object.keys(res).length > 0) {
          dispatch(addData(res)); 
        }
      } else {
        setSearchResults(data); 
      }
    })();

  }, [data]);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  const handleSearchResults = (results: typeof data) => {
    setSearchResults(results);
  };

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sm:px-10 p-6  py-5">
      <ToastContainer autoClose={3000} position="top-right" />
      <nav className="flex justify-between items-center sm:mb-10 mb-2">
        <h1 className="text-2xl sm:text-4xl w-fit h-12 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Security Manager
        </h1>
        <div className="hidden sm:block">
          <SearchBar data={data} onSearchResults={handleSearchResults} />
        </div>

        <div className="sm:space-x-4 flex">
          <button
            onClick={() => setIsAddData((prev) => !prev)}
            className=" hidden sm:block bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 text-white py-2 whitespace-nowrap px-2 sm:px-4 rounded-md font-semibold text-sm"
          >
            Add Data
          </button>
          {isAddData && (
            <AddDataForm data={update} setIsAddData={setIsAddData} />
          )}

          <button
            onClick={handleLogout}
            className=" sm:border-2 border-white rounded-full text-white p-1 sm:p-2 text-xl font-semibold sm:text-sm "
          >
            <MdLogout />
          </button>
        </div>
      </nav>

      <div className="sm:hidden flex gap-2 mb-6">
        <SearchBar data={data} onSearchResults={handleSearchResults} />

        <div className="">
          <button
            onClick={() => setIsAddData((prev) => !prev)}
            className="sm:hidden bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 text-white py-2 whitespace-nowrap px-2 sm:px-4 rounded-md font-semibold text-sm"
          >
            Add Data
          </button>
          {isAddData && (
            <AddDataForm data={update} setIsAddData={setIsAddData} />
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-10">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((data) => (
            <DataCard
              data={data}
              setIsAddData={setIsAddData}
              setUpdate={setUpdate}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-screen h-[80vh]">
            <p className="text-2xl">No Data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
