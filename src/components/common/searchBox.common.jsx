import React from "react";

const SearchBox = ({ value, onChange }) => {
 return (
  <input
   type="type"
   name="query"
   className="form-control my3"
   placeholder="Search..."
   value={value}
   onChange={e => onChange(e.currentTarget.value)}
  />
 );
};

export default SearchBox;
