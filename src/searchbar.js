const SearchBar = () => {
    const handleInputChange = (e) => {
      const searchQuery = e.target.value;
      console.log(searchQuery);
    };
  
    return (
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    );
  };
  export default SearchBar;
