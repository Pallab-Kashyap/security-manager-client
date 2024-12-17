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
import { logout } from "../API/auth";
import UserProfile from "../components/UserProfile";

const Home = () => {
  let data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState<Data | null>(null);
  const [isAddData, setIsAddData] = useState(false);
  const [searchResults, setSearchResults] = useState<Data[] | null>(null);

  useEffect(() => {
    (async () => {
      if (!data || data.length === 0) {
        const res = await getData();
        if (!res) navigate("/login");

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

  let username = "UserName";

  return (
    <div
      // onClick={(e) => {e.currentTarget.id === 'home' && setIsAddData(false)}}  
      id="home"
    className="flex flex-col px-4 sm:px-10   py-5 min-h-screen">
      <ToastContainer autoClose={3000} position="top-right" />
      <nav className="flex justify-between items-center sm:mb-3 ">
        <h1 className="text-2xl sm:text-4xl w-fit h-12 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Security Manager
        </h1>
        <UserProfile username={username} logout={logout} delete={logout} />
      </nav>

      <div className="flex justify-between items-start sm:mb-10 mb-3">
        <div className="hidden sm:block pt-2">
          <SearchBar data={data} onSearchResults={handleSearchResults} />
        </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsAddData((prev) => !prev)}}
            className=" hidden sm:block bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 text-white whitespace-nowrap px-2 sm:px-4 rounded-md font-semibold text-sm  h-10"
          >
            Add Data
          </button>
          {isAddData && (
            <AddDataForm data={update} setIsAddData={setIsAddData} />
          )}

          {/* <button
            onClick={handleLogout}
            className=" sm:border-2 border-white rounded-full text-white p-1 sm:p-2 text-xl font-semibold sm:text-sm "
          >
            <MdLogout />
          </button> */}
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex gap-2 mb-6">
        <SearchBar data={data} onSearchResults={handleSearchResults} />

        <div className="">
          <button
            onClick={() => setIsAddData((prev) => !prev)}
            id="addData"
            className="sm:hidden bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 text-white py-2 whitespace-nowrap px-2 sm:px-4 rounded-md font-semibold text-sm"
          >
            Add Data
          </button>
          {isAddData && (
            <AddDataForm data={update} setIsAddData={setIsAddData} />
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-10 flex-1 justify-center">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((data) => (
            <DataCard
              key={data._id}
              data={data}
              setIsAddData={setIsAddData}
              setUpdate={setUpdate}
            />
          ))
        ) : (
          <div className="flex items-center justify-center col-span-3">
            <p className="text-2xl">No Data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
