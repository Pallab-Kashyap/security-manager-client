import React, { useState } from 'react';
import { Data } from '../constants';


interface SearchBarProps {
  data: Data[];
  onSearchResults: (results: Data[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, onSearchResults }) => {

  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);


    const filteredData = data.filter((item) =>
      item.site.toLowerCase().includes(searchTerm) ||
      item.username.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) 
    );


    onSearchResults(filteredData);
  };

  return (
    <div className="flex flex-col items-center sm:min-w-96 flex-1">
      <input
        type="text"
        placeholder="Search by site"
        value={query}
        onChange={handleSearch}
        className="border border-gray-300 p-[6px] px-2 sm:p-2 rounded-lg w-full max-w-md shadow-sm focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
